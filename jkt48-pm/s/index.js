let pages
let customers = []
let subs = []
let loadmessage
window.addEventListener("contextmenu", function (e) {
    e.preventDefault()
})
axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then(function (response) {
        const firebaseConfig = response.data
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()
        function showError(message) { alert(message) }
        function showSuccess(message) { alert(message) }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let database = firebase.database()
                const ref = database.ref("/")
                ref.on("value", function (snapshot) {
                    let api = snapshot.val().config.api
                    let header = {
                        headers: {
                            "Authorization": `Bearer ${api}`
                        }
                    }
                    axios.get("https://api.mayar.id/hl/v1/transactions?type=subscription&status=settled", header)
                        .then(function (response) {
                            pages = response.data.pageCount
                            for (let z = 1; z < pages + 1; z++) {
                                axios.get(`https://api.mayar.id/hl/v1/transactions?type=subscription&status=settled&page=${z}`, header)
                                    .then(function (response) {
                                        const paid = response.data.data
                                        paid.forEach(function (obj) {
                                            const email = obj.customer.email
                                            const sub = obj.createdAt
                                            customers.push(email)
                                            subs.push(sub)
                                        })
                                        for (let i = 0; i < customers.length; i++) {
                                            if (user.email == customers[i]) {
                                                const numDate = paid[i].createdAt
                                                var date = new Date(numDate)
                                                var y = date.getFullYear()
                                                var m = date.getMonth() + 1
                                                var me = date.getMonth() + 2
                                                var d = date.getDate()
                                                document.getElementById("email").innerHTML = customers[i]
                                                document.getElementById("startSubs").innerHTML = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d
                                                document.getElementById("endSubs").innerHTML = y + "-" + (me < 10 ? "0" : "") + me + "-" + (d < 10 ? "0" : "") + d
                                                document.getElementById("items").style.display = "block"
                                                document.getElementById("load").style.display = "none"
                                                let list = snapshot.val().member
                                                let member = document.querySelector("#member")
                                                const member_items = data => {
                                                    const member_list = document.createElement("template")
                                                    member_list.innerHTML =
                                                        `<option value="${list[i].id}">${list[i].name}</option>`
                                                            .trim()
                                                    return member_list.content.firstChild
                                                }
                                                for (i in list) {
                                                    member.append((member_items(0)))
                                                }
                                                let REFRESH_TOKEN = localStorage.getItem("token")
                                                let userPoolId = snapshot.val().config.userpool
                                                let clientId = snapshot.val().config.client
                                                var authenticationData = {
                                                    Username: snapshot.val().config.email,
                                                    Password: snapshot.val().config.key,
                                                }
                                                var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)
                                                var poolData = {
                                                    UserPoolId: userPoolId,
                                                    ClientId: clientId
                                                }
                                                var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData)
                                                var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
                                                var userData = {
                                                    Username: snapshot.val().config.email,
                                                    Pool: userPool
                                                }
                                                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
                                                cognitoUser.authenticateUser(authenticationDetails, {
                                                    onSuccess: function (result) {
                                                        let accessToken = result.getAccessToken().getJwtToken()
                                                        REFRESH_TOKEN = accessToken

                                                        localStorage.setItem("token", accessToken)
                                                    },
                                                    onFailure: function (err) {
                                                        alert(err);
                                                    }
                                                })
                                                document.getElementById("get").addEventListener("click", () => {
                                                    const chat_item = document.querySelector("#chat-item")
                                                    if (chat_item) {
                                                        chat_item.remove()
                                                    }
                                                    const url = "https://xzqpphzvbzhzvpke6ojjzvbpjq.appsync-api.ap-southeast-1.amazonaws.com/graphql"
                                                    const query = `
                            query MessagesByChannelId(
                                $channelId      : ID!
                                $updatedAt      : ModelStringKeyConditionInput
                                $sortDirection  : ModelSortDirection
                                $filter         : ModelMessageFilterInput
                                $limit          : Int
                                $nextToken      : String
                                ) {
                                    messagesByChannelId(
                                        channelId       : $channelId
                                        updatedAt       : $updatedAt
                                        sortDirection   : $sortDirection
                                        filter          : $filter
                                        limit           : $limit
                                        nextToken       : $nextToken
                                        ) {
                                            items {
                                                id, message, status, format, channelId, publishAt, createdAt, updatedAt, userMessagesId, channelMessagesId, owner, author {
                                                    id, email, nickname, profileImage
                                                }
                                            }
                                            nextToken
                                        }
                                    }
                                `
                                                    //
                                                    let channelId
                                                    //
                                                    if (member.value >= 1 && member.value <= 41) {
                                                        channelId = list[member.value - 1].channelId;
                                                    }
                                                    //
                                                    const body = {
                                                        "variables": {
                                                            "channelId": channelId,
                                                            "limit": 2147483647
                                                        },
                                                        query
                                                    }

                                                    const header = {
                                                        headers: {
                                                            "Authorization": REFRESH_TOKEN,
                                                        }
                                                    }
                                                    axios.post(url, body, header).then(function (response) {
                                                        const chat_query = document.querySelectorAll("#chat-item")
                                                        if (chat_query.length > 0) {
                                                            for (let i = 0; i < chat_query.length; i++) {
                                                                chat_query[i].remove()
                                                            }
                                                        }
                                                        const items = response.data.data.messagesByChannelId.items.reverse()
                                                        const chat_items = data => {
                                                            let timestamp = items[i].createdAt
                                                            let date = timestamp.split("T")
                                                            let time = date[1].split(":")
                                                            let hourset = Number(time[0]) + 7
                                                            let hour
                                                            if (hourset > 23) {
                                                                hour = hourset - 24 
                                                            } else {
                                                                hour = hourset
                                                            }
                                                            const chat_list = document.createElement("template")
                                                            if (items[i].format == "text") {
                                                                chat_list.innerHTML =
                                                                    `<li class="list-group-item" id="chat-item">${items[i].message} <p class="date" style="text-align: right;">${date[0]} ${hour}:${time[1]}</p></li>`
                                                                        .trim()
                                                                return chat_list.content.firstChild
                                                            }
                                                            if (items[i].format == "image") {
                                                                chat_list.innerHTML =
                                                                    `<li class="list-group-item" id="chat-item"><img onerror="this.src='${items[i].message}'" src="${items[i].message}" style="width: -webkit-fill-available"></img> <div style="display: flex; margin-top: 10px"><a href="${items[i].message}" target="_blank" class="btn btn-success date btn-sm">Download</a><p class="date" style="margin-left:auto;">${date[0]} ${hour}:${time[1]}</p></div></li>`
                                                                        .trim()
                                                                return chat_list.content.firstChild
                                                            }
                                                            if (items[i].format == "audio") {
                                                                chat_list.innerHTML =
                                                                    `<li class="list-group-item" id="chat-item"><audio onerror="this.src='${items[i].message}'" controls src="${items[i].message}"></audio> <div style="display: flex; margin-top: 10px"><a href="${items[i].message}" target="_blank" class="btn btn-success date btn-sm">Download</a><p class="date" style="margin-left:auto;">${date[0]} ${hour}:${time[1]}</p></div></li>`
                                                                        .trim()
                                                                return chat_list.content.firstChild
                                                            }
                                                        }
                                                        for (i in items) {
                                                            chat.append((chat_items(0)))
                                                        }
                                                    })
                                                })
                                            } else {
                                                document.getElementById("empty").style.display = "block"
                                                document.getElementById("load").style.display = "none"
                                            }
                                        }
                                    })
                            }
                        })
                })
                document.getElementById("exit").addEventListener("click", () => {
                    firebase.auth().signOut()
                        .then(() => {
                            showSuccess("Logout berhasil!")
                            location.replace("https://habilihsanproject.github.io/jkt48-pm/p/login")
                        })
                        .catch((error) => {
                            showError(error.message)
                        })
                })
                document.getElementById("exits").addEventListener("click", () => {
                    firebase.auth().signOut()
                        .then(() => {
                            showSuccess("Logout berhasil!")
                            location.replace("https://habilihsanproject.github.io/jkt48-pm/p/login")
                        })
                        .catch((error) => {
                            showError(error.message)
                        })
                })
            } else {
                location.replace("https://habilihsanproject.github.io/jkt48-pm/p/login")
            }
        })
    })
