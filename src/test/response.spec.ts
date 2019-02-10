import MockBuilder from '../mockBuilder';
import ExampleImplementation from '../exampleImplementation';

describe('Axios Mock Test', () => {
    it('gets correct responses', () => {
        const builder = new MockBuilder((error) => {
            fail(error);
        });
        
        builder.onGet('some/path')
            .nextException(400, (response) => {
                response['error'] = 'Username required';
                return response;
            })
            .nextResponse((response) => {
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
            fail('The test failed, expected success response');
        });
    });

    it('POSTS correct request and returns correct response', () => {
        const builder = new MockBuilder((error) => {
            fail(error);
        });
        
        builder.onPost('some/path')
            .nextException(500, (response, request) => {
                expect(request['username']).toBe('johndoe');
                return response;
            })
            .nextResponse((response, request) => {
                expect(request['username']).toBe('johndoe');
                response['username'] = 'johndoe';
                response['id'] = '1234';
                return response;
            });
        
        const mock = new ExampleImplementation(builder.build());
        
        mock.post('some/path', {'username':'johndoe'}).then(response => {
            fail('The test failed, expected fail response');
        }).catch(error => {
        });
        
        mock.post('some/path', {'username':'johndoe'}).then(response => {
            expect(response['username']).toBe('johndoe');
            expect(response['id']).toBe('1234');
        }).catch(error => {
            fail('The test failed, expected success response');
        });
    });
});