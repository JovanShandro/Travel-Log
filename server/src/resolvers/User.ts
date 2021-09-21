import { COOKIE_NAME } from '@/constants';
import { User } from '@/entities/User';
import { Context } from '@/types';
import { promise } from '@/utils';
import argon2 from 'argon2';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<any> {
    if (!req.session.userId) {
      return null;
    }

    const { userId } = req.session;

    const [error, user] = await promise(User.findOne(userId));
    if (error) {
      console.log('Error when reading user with id: ', userId);
      return null;
    }

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: Context,
  ): Promise<UserResponse> {
    if (options.username.length < 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username cannot be shorter than 2 characters!',
          },
        ],
      };
    }

    if (options.password.length < 4) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password cannot be shorter than 4 characters!',
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const [error, user] = await promise(
      User.create({
        username: options.username,
        password: hashedPassword,
      }).save(),
    );

    if (error && error.code === '23505') {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username already exists!',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: Context,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: options.username } });

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "Username doesn't exist!",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'The Password is incorrect!',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return await new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log('Error while destroying session: ', err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
