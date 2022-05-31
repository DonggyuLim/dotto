import { InputType, Field } from "@nestjs/graphql";

@InputType()

export class CreateBalanceInput {
    @Field(() => String)
    balance: string
}