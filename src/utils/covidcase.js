const https = require('https')
const url = 'https://api.covid19api.com/summary'

const request = https.request(url, (response)=>{
    let data = ''

    response.on('data', (chunk)=>{
        data = data + chunk.toString()
        
    })

    response.on('end', ()=>{
        const body = JSON.parse(data)
        console.log(body.Global)
    })

})
request.on('error', (error) =>{
    console.log('An Error: ', error)
})
request.end()

// const request = require('request')

// const covidcases = (callback) => {
//     const url = 'http://coronavirus-ph-api.herokuapp.com/cases'
    
//     request({ url, json: true}, (error, { body }) => {
//         if (error){
//            callback('Unable to connect to API Covid Services!', undefined)
//         } else {
//             callback(undefined,{
//                 case_no: body.data[0].case_no
//             })
//         }
//     })
// }

// module.exports = covidcases