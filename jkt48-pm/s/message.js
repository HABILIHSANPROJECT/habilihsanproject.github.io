axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
.then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
    const database = firebase.database()
const ref = database.ref("/")
ref.on("value", function (snapshot) {
    let list = snapshot.val().member

    let REFRESH_TOKEN = localStorage.getItem("token")
    let userPoolId = snapshot.val().userpoolID
    let clientId = snapshot.val().clientID

    var authenticationData = {
        Username: snapshot.val().email,
        Password: snapshot.val().key,
    }
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)
    var poolData = {
        UserPoolId: userPoolId,
        ClientId: clientId
    }
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData)
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
    var userData = {
        Username: snapshot.val().email,
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
    function GET() {
        const chat_item = document.querySelector("#chat-item")
        chat_item.remove()
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
        if (member.value == 1) { channelId = list[0].channelId }
        if (member.value == 2) { channelId = list[1].channelId }
        if (member.value == 3) { channelId = list[2].channelId }
        if (member.value == 4) { channelId = list[3].channelId }
        if (member.value == 5) { channelId = list[4].channelId }
        if (member.value == 6) { channelId = list[5].channelId }
        if (member.value == 7) { channelId = list[6].channelId }
        if (member.value == 8) { channelId = list[7].channelId }
        if (member.value == 9) { channelId = list[8].channelId }
        if (member.value == 10) { channelId = list[9].channelId }
        if (member.value == 11) { channelId = list[10].channelId }
        if (member.value == 12) { channelId = list[11].channelId }
        if (member.value == 13) { channelId = list[12].channelId }
        if (member.value == 14) { channelId = list[13].channelId }
        if (member.value == 15) { channelId = list[14].channelId }
        if (member.value == 16) { channelId = list[15].channelId }
        if (member.value == 17) { channelId = list[16].channelId }
        if (member.value == 18) { channelId = list[17].channelId }
        if (member.value == 19) { channelId = list[18].channelId }
        if (member.value == 20) { channelId = list[19].channelId }
        if (member.value == 21) { channelId = list[20].channelId }
        if (member.value == 22) { channelId = list[21].channelId }
        if (member.value == 23) { channelId = list[22].channelId }
        if (member.value == 24) { channelId = list[23].channelId }
        if (member.value == 25) { channelId = list[24].channelId }
        if (member.value == 26) { channelId = list[25].channelId }
        if (member.value == 27) { channelId = list[26].channelId }
        if (member.value == 28) { channelId = list[27].channelId }
        if (member.value == 29) { channelId = list[28].channelId }
        if (member.value == 30) { channelId = list[29].channelId }
        if (member.value == 31) { channelId = list[30].channelId }
        if (member.value == 32) { channelId = list[31].channelId }
        if (member.value == 33) { channelId = list[32].channelId }
        if (member.value == 34) { channelId = list[33].channelId }
        if (member.value == 35) { channelId = list[34].channelId }
        if (member.value == 36) { channelId = list[35].channelId }
        if (member.value == 37) { channelId = list[36].channelId }
        if (member.value == 38) { channelId = list[37].channelId }
        if (member.value == 39) { channelId = list[38].channelId }
        if (member.value == 40) { channelId = list[39].channelId }
        if (member.value == 41) { channelId = list[40].channelId }
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
                const timestamp = items[i].publishAt
                const date = timestamp.split("T")
                const time = date[1].split(":")
                const chat_list = document.createElement("template")
                if (items[i].format == "text") {
                    chat_list.innerHTML =
                        `<li class="list-group-item" id="chat-item">${items[i].message} <p class="date">${date[0]} ${time[0]}:${time[1]}</p></li>`
                            .trim()
                    return chat_list.content.firstChild
                }
                if (items[i].format == "image") {
                    chat_list.innerHTML =
                        `<li class="list-group-item" id="chat-item"><img src="${items[i].message}" style="width: -webkit-fill-available;"></img> <p class="date">${date[0]} ${time[0]}:${time[1]}</p></li>`
                            .trim()
                    return chat_list.content.firstChild
                }
                if (items[i].format == "audio") {
                    chat_list.innerHTML =
                        `<li class="list-group-item" id="chat-item"><audio controls src="${items[i].message}"></audio> <p class="date">${date[0]} ${time[0]}:${time[1]}</p></li>`
                            .trim()
                    return chat_list.content.firstChild
                }
            }
            for (i in items) {
                chat.append((chat_items(0)))
            }
        })
    }
})
})