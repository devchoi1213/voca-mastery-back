import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler, APIGatewayEvent } from 'aws-lambda';
import { AppModule } from './app.module';
import { ReplaySubject, firstValueFrom } from 'rxjs';
import {initializeTransactionalContext} from "typeorm-transactional";

//Declare a ReplaySubject to store the serverlessExpress instance.
const serverSubject = new ReplaySubject<Handler>()

async function bootstrap(): Promise<Handler> {
	console.log('COLD START: Initializing Nest!!!');
	initializeTransactionalContext();
	const app = await NestFactory.create(AppModule);
	await app.init();

	const expressApp = app.getHttpAdapter().getInstance();
	return serverlessExpress({ app: expressApp });
}

//Do not wait for lambdaHandler to be called before bootstraping Nest.
//Pass the result of bootstrap() into the ReplaySubject
bootstrap().then(server => serverSubject.next(server))

export const handler: Handler = async (
	event: APIGatewayEvent,
	context: Context,
	callback: Callback,
) => {
	//Convert the ReplaySubject to a Promise.
	//Wait for bootstrap to finish, then start handling requests.
	const server = await firstValueFrom(serverSubject)
	return server(event, context, callback);
};

// async function bootstrap() {
// 	initializeTransactionalContext();
// 	const app = await NestFactory.create(AppModule);
// 	await app.listen(3000);
// }
// bootstrap();
