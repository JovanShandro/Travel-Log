import { User } from '@/entities/User';
import { promise } from '@/utils';
import argon2 from 'argon2';
import {
  Arg,
  Field,
  Query,
  InputType,
  Mutation,
  ObjectType,
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
  @Query()
  test(): string {
    return 'It works!';
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
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

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
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

    return {
      user,
    };
  }
}
