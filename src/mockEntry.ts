export default class MockEntry {
    private responses : Array<any> = [];
    private mDefaultResponse : any;

    private modelResponse:  any;
    private modelRequest: any;

    private onFail: (error: Error) => void;
    private endpoint : string;

    constructor (endpoint: string, onFail: (error: Error) => void = null) {
        this.onFail = onFail;
        this.endpoint = endpoint;
    }

    public respondDefault(responseBuilder : (response, request) => any, delay: number = null) : MockEntry {
        this.mDefaultResponse = {status: 200, responseBuilder, delay: delay};
        return this;
    }

    public respond(responseBuilder : (response, request) => any, delay: number = null) : MockEntry {
        this.responses.push({status: 200, responseBuilder, delay: delay});
        return this;
    }

    public exceptDefault(status: number, responseBuilder : (response, request) => any, delay: number = null) : MockEntry {
        if (status == 200) {
            this.throwException(new Error("Exception can't have status 200, use response."));
        }
        this.mDefaultResponse = {status: status, responseBuilder, delay: delay};
        return this;
    }

    public except(status: number, responseBuilder : (response, request) => any, delay: number = null) : MockEntry {
        if (status == 200) {
            this.throwException(new Error("Exception can't have status 200, use respond."));
        }
        this.responses.push({status: status, responseBuilder, delay: delay});
        return this;
    }

    public responseModel(model: any) : MockEntry {
        this.modelResponse = model;
        return this;
    }

    public requestModel(model: any) : MockEntry {
        this.modelRequest = model;
        return this;
    }

    public buildResponse(request: any) : any {
        if (this.modelRequest) {
            this.validateModel(this.modelRequest, request);
        }
        let response = this.responses.shift();
        if (!response) {
            response = this.mDefaultResponse;
        }

        if(!response) {
            this.throwException(new Error("No response defined."));
        }

        const delay = response.delay;
        if(delay) {
            setTimeout(delay);
        }
        
        const completeResponse = response.responseBuilder({}, request);
        if(this.modelResponse) {
            this.validateModel(this.modelResponse, completeResponse);
        }

        return {'response': completeResponse, 'status':response.status};
    }

    private validateModel(model: any, target: any) {
        for (let key in model) {
            let property = model[key];

            if(property.required && !target[key]) {
                this.throwException(new Error("Required property: " + key + " is missing."));
            }

            if (property.subObject && target[key]) {
                this.validateModel(property.subObject, target[key])
            }
        }
    }

    private throwException(error: Error) {
        if (this.onFail) {
            this.onFail(error);
        } else {
            throw error;
        }
    }
}
