let pages
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

                    let query = `query getSubscriptionPageProxy(
                                $page: Int,
                                $pageSize: Int,
                                $id: ID!,
                                $sortField: String,
                                $sortDirection: String) {
                                    getSubscriptionPageProxy(
                                        page: $page
                                        pageSize: $pageSize
                                        id: $id
                                        sortField: $sortField
                                        sortDirection: $sortDirection) {
                                            items {
                                                id, status, createdAt, customer {name, email, mobile }
                                            }
                                            total
                                        }
                                    }`
                    let body = {
                        "operationName": "getSubscriptionPageProxy",
                        "variables": {
                            "pageSize": 1000,
                            "page": 1,
                            "sortDirection": "ASC",
                            "sortField": "status",
                            "id": "56deb16f-c577-434c-abdb-88fb0c421e41"
                        },
                        query
                    }

                    let membership = {
                        "operationName": "getMembershipTierPage",
                        "variables": {
                            "sortDirection": "DESC",
                            "sortField": "createdAt",
                            "pageSize": 1000,
                            "page": 1,
                            "search": {
                                "paymentLinkId": [{
                                    "operator": "eq",
                                    "value": "3cdba6ef-abd5-424f-91f4-b9fb043012e3"
                                }],
                                "status": [{
                                    "operator": "eq",
                                    "value": "ACTIVE"
                                }]
                            }
                        },
                        "query": `query getMembershipTierPage($page: Int, $pageSize: Int, $search: MembershipTierSearchInput, $searchAny: MembershipTierSearchInput, $sortDirection: SortDirection = DESC, $sortField: MembershipTierSortField = createdAt) {
                                    getMembershipTierPage(
                                    page: $page
                                    pageSize: $pageSize
                                    search: $search
                                    searchAny: $searchAny
                                    sortDirection: $sortDirection
                                    sortField: $sortField) {
                                        items {
                                          id, name, description, paymentAtStart, limit, finishMembershipAt, status, notes, gracePeriodInDays, isTrialAvailable, upfrontFee, membershipCustomer {id, status, customer { name, email }
                                        }
                                        membershipTierPeriod { id, amount, status, monthPeriod }
                                    }
                                    nextPage
                                }
                            }`
                    }

                    axios.post("https://api.mayar.id/www", body, header)
                        .then(function (response) {

                            const customers = []
                            const paid = response.data.data.getSubscriptionPageProxy.items
                            const subs = paid.filter(obs => obs.status === "active")
                            subs.forEach(function (obj) {
                                const email = obj.customer.email
                                customers.push(email)

                            })
                            for (let i = 0; i < customers.length; i++) {
                                if (user.email == customers[i]) {
                                    const numDate = subs[i].createdAt
                                    var date = new Date(numDate)
                                    var y = date.getFullYear()
                                    var m = date.getMonth() + 1
                                    var me = date.getMonth() + 2
                                    if (me === 13) {
                                        me = 1
                                    }
                                    var d = date.getDate()
                                    document.getElementById("email").innerHTML = customers[i]
                                    //document.getElementById("startSubs").innerHTML = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d
                                    //document.getElementById("endSubs").innerHTML = y + "-" + (me < 10 ? "0" : "") + me + "-" + (d < 10 ? "0" : "") + d
                                    document.getElementById("items").style.display = "block"
                                    document.getElementById("load").style.display = "none"
                                    document.getElementById("empty").style.display = "none"
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
                                            document.getElementById("loadChat").style.display = "none"
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
                                        if (member.value >= 1 && member.value <= 41) {
                                            channelId = list[member.value - 1].channelId;
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
                                                chatNext.append((chat_items(0)))
                                            }
                                        })
                                    

                                        }
                                    })
                                }
                                if (document.getElementById("items").style.display === "none") {
                                    document.getElementById("empty").style.display = "block"
                                    document.getElementById("load").style.display = "none"
                                }


                            }


                        })


                    //NEW METHOD MEMBERSHIP
                    axios.post("https://api.mayar.id/www", membership, header)
                        .then(function (response) {

                            const customers = []
                            const paid = response.data.data.getMembershipTierPage.items[0].membershipCustomer
                            console.log(paid)
                            const subs = paid.filter(obs => obs.status === "active")
                            subs.forEach(function (obj) {
                                const email = obj.customer.email
                                customers.push(email)

                            })
                            for (let i = 0; i < customers.length; i++) {
                                if (user.email == customers[i]) {
                                    const numDate = subs[i].createdAt
                                    var date = new Date(numDate)
                                    var y = date.getFullYear()
                                    var m = date.getMonth() + 1
                                    var me = date.getMonth() + 2
                                    if (me === 13) {
                                        me = 1
                                    }
                                    var d = date.getDate()
                                    document.getElementById("email").innerHTML = customers[i]
                                    //document.getElementById("startSubs").innerHTML = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d
                                    //document.getElementById("endSubs").innerHTML = y + "-" + (me < 10 ? "0" : "") + me + "-" + (d < 10 ? "0" : "") + d
                                    document.getElementById("items").style.display = "block"
                                    document.getElementById("load").style.display = "none"
                                    document.getElementById("empty").style.display = "none"
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
                                            document.getElementById("loadChat").style.display = "none"
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
                                        if (member.value >= 1 && member.value <= 41) {
                                            channelId = list[member.value - 1].channelId;
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
                                                chatNext.append((chat_items(0)))
                                            }
                                        })
                                            }
                                        })
                                        
                                        
                                    })
                                }
                                if (document.getElementById("items").style.display === "none") {
                                    document.getElementById("empty").style.display = "block"
                                    document.getElementById("load").style.display = "none"
                                }
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

