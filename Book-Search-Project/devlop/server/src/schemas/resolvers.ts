import { GraphQLError } from "graphql";
import User from "../models/User.js";
import { signToken } from "../services/auth.js";
import type { BookInput } from "../types/book.js";
import type { Context } from "../types/context.js";

export const resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: Context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new GraphQLError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (
      _: unknown,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials");
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (
      _: unknown,
      { bookData }: { bookData: BookInput },
      context: Context
    ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new GraphQLError("You need to be logged in!");
    },

    removeBook: async (
      _: unknown,
      { bookId }: { bookId: string },
      context: Context
    ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new GraphQLError("You need to be logged in!");
    },
  },
};
