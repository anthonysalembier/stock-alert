import constants from '../config/constants.js';
import axios from 'axios';

function postServiceRunning() {
    const config = {
        headers: {
            'Authorization': `Bearer ${constants.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        }
    }

    const body = {
        'messaging_product': 'whatsapp',
        'to': constants.PHONE_NUMBER,
        'type': 'template',
        'template': {
            'name': 'service_running',
            'language': {
                'code': 'fr'
            }
        }
    }

    const url = `https://graph.facebook.com/v13.0/${constants.PHONE_NUMBER_ID}/messages`

    return axios.post(url, body, config);
}

function postStockAvailableTemplate() {
    const config = {
        headers: {
            'Authorization': `Bearer ${constants.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        }
    }

    const body = {
        'messaging_product': 'whatsapp',
        'to': constants.PHONE_NUMBER,
        'type': 'template',
        'template': {
            'name': 'stock_available',
            'language': {
                'code': 'fr'
            }
        }
    }

    const url = `https://graph.facebook.com/v13.0/${constants.PHONE_NUMBER_ID}/messages`

    return axios.post(url, body, config);
}

/**
 * Send WhatsApp message with custom template.
 * TODO not working for now.
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
function postTextMessage() {
    const config = {
        headers: {
            'Authorization': `Bearer ${constants.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        }
    }

    const body = {
        'messaging_product': 'whatsapp',
        'recipient_type': 'individual',
        'to': constants.PHONE_NUMBER,
        'type': 'text',
        'text': {
            'preview_url': false,
            'body': 'test message'
        }
    }

    const url = `https://graph.facebook.com/v14.0/${constants.PHONE_NUMBER_ID}/messages`

    return axios.post(url, body, config);
}

export default {
    postServiceRunning,
    postStockAvailableTemplate,
    postTextMessage,
}
