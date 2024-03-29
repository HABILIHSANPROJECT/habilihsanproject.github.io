let pages
let loadmessage
let emailPM = localStorage.getItem("emailPM")

window.addEventListener("contextmenu", function (e) {
    e.preventDefault()
})

axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then(function (response) {
        const firebaseConfig = response.data
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem("emailPM", user.email)
                let database = firebase.database()
                const ref = database.ref("/")
                ref.on("value", function (snapshot) {
                    let api = snapshot.val().config.api
                    let header = {
                        headers: {
                            "Authorization": `Bearer ${api}`
                        }
                    }

                    let query = `query getMembershipCustomerPage($page: Int, $pageSize: Int, $sortDirection: SortDirection, $sortField: MembershipCustomerSortField, $search: MembershipCustomerSearchInput, $searchAny: MembershipCustomerSearchInput) {
                        getMembershipCustomerPage(
                            page: $page
                            pageSize: $pageSize
                            sortDirection: $sortDirection
                            sortField: $sortField
                            search: $search
                            searchAny: $searchAny
                        ) {
                            items {
                                id
                                createdAt
                                customerId
                                membershipTierId
                                nextPayment
                                status
                                updatedAt
                                userId
                                memberId
                                membershipTier {
                                      name
                                      gracePeriodInDays
                                }
                                customer {
                                      name
                                      mobile
                                      email
                                }
                            }
                            nextPage
                        }
                    }`

                    let body = {
                        "operationName": "getMembershipCustomerPage",
                        "variables": {
                            "pageSize": 2147483647,
                            "page": 1,
                            "sortDirection": "ASC",
                            "sortField": "status",
                            "search": {
                                "paymentLinkId": [{
                                    "operator": "eq",
                                    "value": "3cdba6ef-abd5-424f-91f4-b9fb043012e3"
                                }]
                            }
                        },
                        "query": query
                    }

                    axios.post("https://api.mayar.id/www", body, header)
                        .then(function (response) {

                            const customers = []
                            const paid = response.data.data.getMembershipCustomerPage.items
                            const subs = paid.filter(obs => obs.status === "active")
                            subs.forEach(function (obj) {
                                const email = obj.customer.email
                                customers.push(email)

                            })
                            for (let i = 0; i < customers.length; i++) {
                                if (emailPM == customers[i] || user.email == customers[i]) {
                                    console.log("CONFIRMED")
                                    const numDate = subs[i].createdAt
                                    var date = new Date(numDate)
                                    var y = date.getFullYear()
                                    var m = date.getMonth() + 1
                                    var me = date.getMonth() + 2
                                    if (me === 13) {
                                        me = 1
                                    }
                                    var d = date.getDate()
                                    if (document.getElementById("items")) {
                                        document.getElementById("email").innerHTML = customers[i]
                                        document.getElementById("startSubs").innerHTML = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d
                                        document.getElementById("endSubs").innerHTML = y + "-" + (me < 10 ? "0" : "") + me + "-" + (d < 10 ? "0" : "") + d
                                        document.getElementById("paycheck").attributes.href.value = `https://habilihsanproject.mayar.link/pay-membership/${subs[i].memberId}`
                                        document.getElementById("items").style.display = "block"
                                        document.getElementById("load").style.display = "none"
                                        if (document.getElementById("empty")) {
                                            document.getElementById("empty").style.display = "none"
                                        }
                                    }
                                    let list = snapshot.val().member

                                    let members = document.querySelector("#member")
                                    const member_items = data => {
                                        const member_list = document.createElement("template")
                                        member_list.innerHTML =
                                            `<option value="${list[i].id}">${list[i].name}</option>`
                                                .trim()
                                        return member_list.content.firstChild
                                    }
                                    if (members) {
                                        for (i in list) {
                                            members.append(member_items(0))
                                        }
                                    }

                                    localStorage.setItem("token", "eyJraWQiOiJcL2FrZkNyZVFEWXJtT2JPbFpZelpaNXZNa2ZvSGp5dkNkZWVZTWVCR3pCYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5ZDY4MWRlOC1jOGExLTQ2MzktODhjMy0xMjg5NzFkODVjNzAiLCJjb2duaXRvOmdyb3VwcyI6WyJVc2VycyJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfUm9IQ3Y2SWxjIiwiY2xpZW50X2lkIjoiNzU5MGpmaGVibWcxZWdvc2lsdWNvb3Q1YWsiLCJvcmlnaW5fanRpIjoiZWMzYWRhZTktMzIzYy00MGJhLWJmYzEtNTZlNGIxZDk0YjY0IiwiZXZlbnRfaWQiOiJlMGQyNzk3NC1kOTZiLTQ5NjEtYWEzZS00NDJmMjNiYzM0MGIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzExNzEyNTU3LCJleHAiOjE3MTE3MzEzOTEsImlhdCI6MTcxMTcyNzc5MSwianRpIjoiZGU2YjBmNDItODAzYy00Y2U1LTlmYzItMWNlMDczMTk0MWU4IiwidXNlcm5hbWUiOiI5ZDY4MWRlOC1jOGExLTQ2MzktODhjMy0xMjg5NzFkODVjNzAifQ.Dq1OA0BwIRS8uP0nmdifrhssHRl4EptzsA-2pcTs0zOwS-1-2l3hfS-dyXVF91SyisLPgcnHvn0cRZwKtQZmWUOXlJESkRs0bdm7bjywk6MEWREjlOPx9B2s73GBNd7qBXlVDhGFbzQEQv1LYlNSlW-Vw0Qeu_liu0Rs2Zo1Ud8PilnuwBQy-NcEdGyMpk3CSi06RX6GgoE17UlpNLUrziw2hPXgiXvQg4-gVzjlSAionhRPbxbHpY3bPfIss3umb4D1Xdyqk7ux5lGpk3Ay1Qj3Zd2XgS0rr4ZPz-WEixrDR7hLBlA4sv4USTCqBW2Q-0e8wm-LqrfRHDEmLMkHzg")
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
                                            alert(err)
                                        }
                                    })
                                    if (document.getElementById("get")) {

                                        document.getElementById("get").addEventListener("click", () => {
                                            document.getElementById("loadChat").style.display = "block"
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
                                                        }`
                                            //
                                            let channelId
                                            //
                                            if (members.value >= 1 && members.value <= 41) {
                                                channelId = list[members.value - 1].channelId;
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
                                                if (members.value >= 1 && members.value <= 41) {
                                                    channelId = list[members.value - 1].channelId;
                                                }

                                                document.getElementById("loadChat").style.display = "none"
                                                const chat_query = document.querySelectorAll("#chat-item")
                                                if (chat_query.length > 0) {
                                                    for (let i = 0; i < chat_query.length; i++) {
                                                        chat_query[i].remove()
                                                    }
                                                }
                                                const items = response.data.data.messagesByChannelId.items.reverse()
                                                ///
                                                var DB = firebase.firestore()
                                                var dbRef = DB.collection("data").doc(channelId)
                                                const chatData = {items : response.data.data.messagesByChannelId.items}
                                                dbRef.set(chatData)
                                                    .then(() => {
                                                        console.log("Data terbackup!");
                                                    })
                                                    .catch((error) => {
                                                        console.error("Tidak terbackup");
                                                    });
                                                ///
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
                                                            `<li class="list-group-item" id="chat-item">
                                                        <div class="profpic"><a href="${items[i].author.profileImage}" target="_blank"><img src="${items[i].author.profileImage}"></a>${items[i].message} </div>
                                                        <p class="date" style="text-align: right;">${date[0]} ${hour}:${time[1]}</p>
                                                        </li>`
                                                                .trim()
                                                        return chat_list.content.firstChild
                                                    }
                                                    if (items[i].format == "image") {
                                                        chat_list.innerHTML =
                                                            `<li class="list-group-item" id="chat-item">
                                                        <div class="profpic mb-3"><a href="${items[i].author.profileImage}" target="_blank"><img src="${items[i].author.profileImage}"></a></div>
                                                        <img onerror="this.src='${items[i].message}'" src="${items[i].message}" style="width: -webkit-fill-available"></img>
                                                        <div style="display: flex; margin-top: 10px"><a href="${items[i].message}" target="_blank" class="btn btn-success date btn-sm">Download</a><p class="date" style="margin-left:auto;">${date[0]} ${hour}:${time[1]}</p></div>
                                                        </li>`
                                                                .trim()
                                                        return chat_list.content.firstChild
                                                    }
                                                    if (items[i].format == "audio") {
                                                        chat_list.innerHTML =
                                                            `<li class="list-group-item" id="chat-item">
                                                        <div class="profpic"><a href="${items[i].author.profileImage}" target="_blank"><img src="${items[i].author.profileImage}"></a><audio onerror="this.src='${items[i].message}'" controls src="${items[i].message}"></audio></div>
                                                        <div style="display: flex; margin-top: 10px"><a href="${items[i].message}" target="_blank" class="btn btn-success date btn-sm">Download</a><p class="date" style="margin-left:auto;">${date[0]} ${hour}:${time[1]}</p></div>
                                                        </li>`
                                                                .trim()
                                                        return chat_list.content.firstChild
                                                    }
                                                }
                                                for (i in items) {
                                                    chat.append((chat_items(0)))
                                                }

                                                const nextToken = response.data.data.messagesByChannelId.nextToken
                                                if (nextToken != null) {


                                                    const chat_item = document.querySelector("#chat-item-next")
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
                                                    if (members.value >= 1 && members.value <= 41) {
                                                        channelId = list[members.value - 1].channelId;
                                                    }
                                                    //
                                                    const body = {
                                                        "variables": {
                                                            "channelId": channelId,
                                                            "limit": 2147483647,
                                                            "nextToken": nextToken
                                                        },
                                                        query
                                                    }

                                                    const header = {
                                                        headers: {
                                                            "Authorization": REFRESH_TOKEN,
                                                        }
                                                    }
                                                    axios.post(url, body, header).then(function (response) {
                                                        const chat_query = document.querySelectorAll("#chat-item-next")
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
                                                                    `<li class="list-group-item" id="chat-item">
                                                        <div class="profpic"><a href="${items[i].author.profileImage}" target="_blank"><img src="${items[i].author.profileImage}"></a>${items[i].message} </div>
                                                        <p class="date" style="text-align: right;">${date[0]} ${hour}:${time[1]}</p>
                                                        </li>`
                                                                        .trim()
                                                                return chat_list.content.firstChild
                                                            }
                                                            if (items[i].format == "image") {
                                                                chat_list.innerHTML =
                                                                    `<li class="list-group-item" id="chat-item">
                                                        <div class="profpic mb-3"><a href="${items[i].author.profileImage}" target="_blank"><img src="${items[i].author.profileImage}"></a></div>
                                                        <img onerror="this.src='${items[i].message}'" src="${items[i].message}" style="width: -webkit-fill-available"></img>
                                                        <div style="display: flex; margin-top: 10px"><a href="${items[i].message}" target="_blank" class="btn btn-success date btn-sm">Download</a><p class="date" style="margin-left:auto;">${date[0]} ${hour}:${time[1]}</p></div>
                                                        </li>`
                                                                        .trim()
                                                                return chat_list.content.firstChild
                                                            }
                                                            if (items[i].format == "audio") {
                                                                chat_list.innerHTML =
                                                                    `<li class="list-group-item" id="chat-item">
                                                        <div class="profpic"><a href="${items[i].author.profileImage}" target="_blank"><img src="${items[i].author.profileImage}"></a><audio onerror="this.src='${items[i].message}'" controls src="${items[i].message}"></audio></div>
                                                        <div style="display: flex; margin-top: 10px"><a href="${items[i].message}" target="_blank" class="btn btn-success date btn-sm">Download</a><p class="date" style="margin-left:auto;">${date[0]} ${hour}:${time[1]}</p></div>
                                                        </li>`
                                                                        .trim()
                                                                return chat_list.content.firstChild
                                                            }
                                                        }
                                                        for (i in items) {
                                                            chatNext.append((chat_items(0)))
                                                        }
                                                    })
                                                }
                                            })


                                        })
                                    }
                                }
                                if (document.getElementById("items")) {
                                    if (document.getElementById("items").style.display === "none") {
                                        if (document.getElementById("empty")) {
                                            document.getElementById("empty").style.display = "block"
                                        }
                                        document.getElementById("load").style.display = "none"
                                    }
                                }
                            }
                        })

                })
            } else {
                location.replace("https://habilihsanproject.github.io/jkt48-pm/p/login")
            }
        })
        if (document.getElementById("exits")) {
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
        }

        if (document.getElementById("exit")) {
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
        }
    })
