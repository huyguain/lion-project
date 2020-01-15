const config = {
    "port": 8080,
    "bodyLimit": "2mb",
    "corsHeaders": ["http://127.0.0.1", 'http://127.0.0.1:3000'],
    "secret": "hhgjh4142TY&_JH",
    "database": "mongodb://localhost:27017/tools_fa",
    email_config: {
        'FROM': 'Nodejs Team <nodejsHn1701@fsoft.com.vn>',
        "smtp_server": 'mail.fsoft.com.vn',
        "smtp_port": 587,
        "smtp_username": 'NuVXT@fsoft.com.vn',
        "smtp_pass": "ngochan13."
    }
}

export default config