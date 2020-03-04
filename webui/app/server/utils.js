// Better alternative to promises: https://github.com/folktale/data.task
import Task from 'data.task'

// Simple HTTP client: https://github.com/request/request
import Request from 'request'

// httpGet :: Url -> Task Error Result
export const httpGet = url =>
    new Task((reject, resolve) =>
        Request(
            url,
            (error, response, body) => (error ? reject(error) : resolve(body))
        )
    )
