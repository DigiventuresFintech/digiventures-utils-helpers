import {connect} from '../../src/client/mongodb/MongodbMultiConn'

describe(__filename, () => {

    test('should connect successfully', async () => {
        await connect({
            "default": {
                "mongodb": {
                    "connection": {
                        "string": "mongodb+srv://onboarding-qa:af7wDEHSgvaMvYTs@cluster0.8ijtz.mongodb.net/${database}?retryWrites=true&w=majority",
                        "options": {
                            "useNewUrlParser": true,
                            "useUnifiedTopology": true,
                            "authSource": "admin"
                        }
                    },
                    "encryption": {
                        "enabled": true,
                        "key": "WnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/",
                        "iv": "McQfTjWnZr4u7w!z",
                        "models": {
                            "legajo": {
                                "enabled": true,
                                "fields": [
                                    "idNumber"
                                ]
                            }
                        }
                    },
                    "plugins": []
                }
            },
            "62191180f5e6b7e31f84447d": {
                "mongodb": {
                    "connection": {
                        "string": "mongodb+srv://onboarding-qa:af7wDEHSgvaMvYTs@cluster0.8ijtz.mongodb.net/documents_ripley_peru?retryWrites=true&w=majority",
                        "options": {
                            "useNewUrlParser": true,
                            "useUnifiedTopology": true
                        }
                    },
                    "encryption": {
                        "enabled": true,
                        "key": "gVkYp2s5v8y/B?E(H+MbQeThWmZq4t6w",
                        "iv": "Yq3t6w9z$C&F)J@N",
                        "models": {
                            "legajo": {
                                "enabled": true,
                                "fields": [
                                    "idNumber"
                                ]
                            }
                        }
                    },
                    "plugins": []
                }
            },
            "62195fcdc8b99af141555ec8": {
                "mongodb": {
                    "connection": {
                        "string": "mongodb+srv://onboarding-qa:af7wDEHSgvaMvYTs@cluster0.8ijtz.mongodb.net/documents_ripley_chek?retryWrites=true&w=majority",
                        "options": {
                            "useNewUrlParser": true,
                            "useUnifiedTopology": true
                        }
                    },
                    "encryption": {
                        "enabled": true,
                        "key": "kYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z",
                        "iv": "cRfUjXn2r5u8x!A%",
                        "models": {
                            "legajo": {
                                "enabled": true,
                                "fields": [
                                    "idNumber"
                                ]
                            }
                        }
                    },
                    "plugins": []
                }
            }
        })
    })
})
