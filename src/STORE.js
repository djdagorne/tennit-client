function makeUserArray() {
    return [
        {
            id: 1,
            email: 'john@email.com',
            password: 'AAaa11!!',
            firstName: 'John',
            lastName: 'Johnson',
            gender: 'male',
            prefGender: 'female',
            age: 20,
            phone: '555-555-5555',
            address: '123 Street Road',
            location: {
                country: 'Canada',
                provence: 'Ontario',
                city: 'Toronto'
            },
            rent: '1000',
            listing: true,
        },
        {
            id: 2,
            email: 'susan@email.com',
            password: 'AAaa11!!',
            firstName: 'Susan',
            lastName: 'Susanson',
            gender: 'female',
            prefGender: 'male',
            age: 20,
            phone: '555-555-5555',
            address: '123 Road Street',
            location: {
                country: 'Canada',
                provence: 'Ontario',
                city: 'Toronto'
            },
            rent: '1000',
            listing: true,
        },
    ]
}

function makeImageArray(user){
    return [
        {
            id: 1,
            image: 'https://loremflickr.com/750/300/landscape?random=1',
            user_id: user[0].id,
            date_updated: new Date(),
        },
        {
            id: 2,
            image: 'https://loremflickr.com/750/300/landscape?random=2',
            user_id: user[0].id,
            date_updated: new Date(),
        },
        {
            id: 3,
            image: 'https://loremflickr.com/750/300/landscape?random=3',
            user_id: user[0].id,
            date_updated: new Date(),
        },
        {
            id: 4,
            image: 'https://loremflickr.com/750/300/landscape?random=4',
            user_id: user[1].id,
            date_updated: new Date(),
        },
        {
            id: 5,
            image: 'https://loremflickr.com/750/300/landscape?random=5',
            user_id: user[1].id,
            date_updated: new Date(),
        },
        {
            id: 6,
            image: 'https://loremflickr.com/750/300/landscape?random=6',
            user_id: user[1].id,
            date_updated: new Date(),
        },
    ]
}
//potential match display:
//if matches.user1_bool = true && matches.user2_bool = false, link to user2 profile 
//if matches.user1_bool = false && matches.user2_bool = true, link to user1 profile 

//convo link display: 
//if matches.user1_bool && matches.user2_bool = true, 
//      SEARCH FOR EXISTING CONVO
//      from tennit_convo table -> select convo.id -> 
//      where convo.user1_id=matches.user1_id && convo.user2_id=matches.user2_id

function makeMatchArray(users){
    return [
        {
            id: 1,
            user1_id: users[0].id,
            user2_id: users[1].id,
            user1_bool: true,
            user2_bool: true,
        }
    ]
}

function makeConvoArray(matches){
    return[
        {
            id: 1,
            user1_id: matches[0].user1_id,
            user2_id: matches[0].user2_id,
            date_created: new Date(),
        }
    ]
}

function makeThingsFixtures(){
    const testUsers = makeUserArray()
    const testImages = makeImageArray(testUsers)
    const testMatches = makeMatchArray(testUsers)
    const testConvos = makeConvoArray(testMatches)

    return { testUsers, testImages, testMatches, testConvos}
}


module.exports = {
    makeUserArray,
    makeImageArray,
    makeMatchArray,
    makeConvoArray,

    makeThingsFixtures,
}