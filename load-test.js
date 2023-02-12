/**
 * Load test user authentication using k6:
 * Docs: https://k6.io/docs/get-started/running-k6
 *
 * Example:
 * - k6 run -e BASE_URL=http://localhost:8000 --vus 100 --iterations 1000 load-test.js
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000'

export const options = {
    stages: [{ target: 70, duration: '10s' }],
    thresholds: {
        http_req_duration: ['p(95)<500', 'p(99)<1500'],
        'http_req_duration{name:PublicCrocs}': ['avg<400'],
        'http_req_duration{name:Create}': ['avg<600', 'max<1000'],
    },
}

export default () => {
    const res = http.get(`${BASE_URL}/posts`)
    check(res, { 'Test fetch Posts data successfully': () => res !== '' })
    sleep(1)
}
