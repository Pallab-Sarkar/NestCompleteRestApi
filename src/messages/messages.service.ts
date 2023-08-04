import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {

  message: Message[] = [{name: "Admin", text: "You can start typing.."}]
  clientToUser = {}

  identify(name: string, clientId: string){
    this.clientToUser[clientId] = name

    return Object.values(this.clientToUser)
  }

  getClientName(clientId: string){
    return this.clientToUser[clientId]
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {

    const msg = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text
    }
    this.message.push(msg)

    return msg
  }

  findAll() {
    return this.message;
  }

}
