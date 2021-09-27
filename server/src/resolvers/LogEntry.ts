import {
  Resolver,
  Arg,
  Ctx,
  Query,
  Field,
  Mutation,
  InputType,
  UseMiddleware,
} from 'type-graphql';
import { LogEntry } from '@/entities/LogEntry';
import { isAuth } from '@/middleware/isAuth';
import { Context } from '@/types';

@InputType()
class LogEntryInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  comments: string;
  @Field()
  image: string;
  @Field()
  longitude!: number;
  @Field()
  latitude!: number;
  @Field(() => String)
  visitDate!: Date;
}

@Resolver()
export class LogEntryResolver {
  @Query(() => [LogEntry])
  @UseMiddleware(isAuth)
  async logEntries(@Ctx() { req }: Context): Promise<any> {
    return LogEntry.find({ where: { creatorId: req.session.userId } });
  }

  @Mutation(() => LogEntry)
  @UseMiddleware(isAuth)
  async createLogEntry(
    @Arg('data') data: LogEntryInput,
    @Ctx() { req }: Context,
  ): Promise<LogEntry> {
    return await LogEntry.create({
      ...data,
      creatorId: req.session.userId,
    }).save();
  }
}
