import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();
main.use('/mycashee',app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended:false}));

const db =  admin.firestore();
export const webApi = functions.https.onRequest(main);
 

interface Employee
{
    name: string,
    nickName: string,
    phone: string,
    address: string,
    active: boolean
}

app.post('/employee', async(req,res) => {

   try
   {
        const employee: Employee = {
            name: req.body['name'],
            nickName: req.body['nickName'],
            phone: req.body['phone'],
            address: req.body['address'],
            active:req.body['active']           
        }

        const newDoc = await db.collection('employee').add(employee);
        res.status(201).send(`Created a new employee: ${newDoc.id}`);
   }
   catch (error) 
   {
        res.status(400).send(`User should cointain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`)
   }
})
