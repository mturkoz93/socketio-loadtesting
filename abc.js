const Bull = require('bull')
const contentsQueue = new Bull('mustafa', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
})
// contentsQueue.add(data, options)
contentsQueue.process(async (job) => {
    console.log(`Processing job ${job.id}`)
    console.log(job.data)
    console.log('______________________________')
    return await contentNotification(job.data)
})
function contentNotification(data) {
    console.log('++++++++++++++++++++++++++++++++')
    console.log(data)
}

let dates = [{id: 1, time: 100000}, {id: 2, time: 50000}, {id: 3, time: 150000}]
dates.forEach(element => {
    createTask(element)
})

let count = 0
setInterval(() => {
    ++count
    console.log(count)
}, 1000)

function createTask(element) {
    return new Promise((resolve, reject) => {
      if (resolve) {
        const options = {
          jobId: element.id,
          delay: element.time, // 60000: 1 dakika
          attempts: 1,
          backoff: 1,
          removeOnComplete: true,
          removeOnFail: true
        }
        contentsQueue.add(element, options)
        resolve(true)
      }
    })
  }