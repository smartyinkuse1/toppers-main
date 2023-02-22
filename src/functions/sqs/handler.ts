import { getUserController } from '@libs/controller-resolver';
import { SQSHandler } from 'aws-lambda';
import { AuthUserActions } from 'src/models/enums/sqs.enum';
import { SqsBody } from 'src/models/interfaces/sqs.interface';


const sqs: SQSHandler = async (event) => {
  const userController = await getUserController();
  try {
    for (const record of event.Records) {
      console.log('Message Body -->  ', record.body);
      const recordBody: SqsBody = JSON.parse(record.body);

      switch (recordBody.action) {
        case AuthUserActions.CREATE_USER:
          return userController.addAuthUser(recordBody);
      }
      
    }
  } catch (error) {
    console.log(error);
  }
};

export const main = sqs;
