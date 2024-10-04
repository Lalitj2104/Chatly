import { User } from '../models/userModel.js';
import faker from 'faker';
const createUser = async (numUsers)=>{
    try {

        const usersPromise=[];
        for (let i = 0; i < numUsers; i++) {
            const user = User.create ({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "123456",
                avatar:{
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName(),
                }
            });
            usersPromise.push(tempUser);
        }
        await Promise.all(usersPromise);
        console.log('Users created',numUsers);
        process.exit(1);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}