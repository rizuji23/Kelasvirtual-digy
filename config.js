const env = process.env.NODE_ENV || 'production'

const config = {
    development: {
        APIKey: 'aOAxMfi-S0qRDti38v-HbQ',
        APISecret: 'hsD6XgCMETXvW6yQdAK8aindtFeAfNTWv0U9'
    },
    production: {
        APIKey: 'aOAxMfi-S0qRDti38v-HbQ',
        APISecret: 'hsD6XgCMETXvW6yQdAK8aindtFeAfNTWv0U9'
    }
};

module.exports = config[env]