import {RockitBuilder} from '../index';
import ExampleImplementation from '../exampleImplementation';

describe('Rockit Test', () => {
    it('gets correct responses', () => {
        const builder = new RockitBuilder({
            onFail: (error) => {
                fail(error);
            }
        });
        
        builder.onGet('some/path')
            .except(400, (response) => {
                response['error'] = 'Username required';
                return response;
            })
            .respond((response) => {
                response['username'] = 'fisk';
                response['id'] = '1234';
                return response;
            });
        
        const mock = new ExampleImplementation(builder.build());
        
        mock.get('some/path').then(response => {
            fail('The test failed, expected fail response');
        }).catch(error => {
            expect(error['error']).toBe('Username required')
        });
        
        mock.get('some/path').then(response => {
            expect(response['username']).toBe('fisk');
            expect(response['id']).toBe('1234');
        }).catch(error => {
            fail('Expected success response');
        });
    });

    it('POSTS correct request and returns correct response', () => {
        const builder = new RockitBuilder({
            onFail: (error) => {
                fail(error);
            }
        });
        
        builder.onPost('some/path')
            .except(500, (response, request) => {
                expect(request['username']).toBe('johndoe');
                return response;
            })
            .respond((response, request) => {
                expect(request['username']).toBe('johndoe');
                response['username'] = 'johndoe';
                response['id'] = '1234';
                return response;
            });
        
        const mock = new ExampleImplementation(builder.build());
        
        mock.post('some/path', {'username':'johndoe'}).then(response => {
            fail('Expected fail response');
        }).catch(error => {
        });
        
        mock.post('some/path', {'username':'johndoe'}).then(response => {
            expect(response['username']).toBe('johndoe');
            expect(response['id']).toBe('1234');
        }).catch(error => {
            fail('Expected success response');
        });
    });

    it('matches pattern on url', () => {
        const builder = new RockitBuilder({
            onFail: (error) => {
                fail(error);
            }
        });

        builder.onGet('/some/path/{}/account').respond((response) => {
            response['currency'] = 'SEK';
            response['balance'] = 200;
            return response;
        });

        const mock = new ExampleImplementation(builder.build());

        mock.get('/some/path/12398978-213423-2342/account').then(response => {
            expect(response['currency']).toBe('SEK');
            expect(response['balance']).toBe(200);
        }).catch((error) => {
            fail(error)
        });
    });

    it('fails when something in the mock setup is wrong', () => {
        let failure = null;
        const builder = new RockitBuilder({
            onFail: (error) => {
                failure = error;
            }
        });

        builder.onGet('/some/path/{}/account').respond((response) => {
            response['currency'] = 'SEK';
            response['balance'] = 200;
            // return response; <-- the issue
        });

        const mock = new ExampleImplementation(builder.build());

        mock.get('/some/path/12398978-213423-2342/account');

        expect(failure.toString()).toBe('Error: GET/some/path/12398978-213423-2342/account No response, make sure the response method actually returns the response.');
    });
});