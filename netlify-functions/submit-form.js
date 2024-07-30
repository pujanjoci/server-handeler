const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    const formData = JSON.parse(event.body);

    try {
        const response = await fetch('https://formspree.io/f/xovadqbk', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FORMSPREE_API_KEY}` // Add your Formspree API key here
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Thank you for your message!' })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Something went wrong. Please try again.' })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'There was an error. Please try again.' })
        };
    }
};
