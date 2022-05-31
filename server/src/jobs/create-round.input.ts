import { InputType, Field } from "@nestjs/graphql";

@InputType()

export class CreateRoundInput {
    @Field(() => Number)
    round: number
    @Field(() => String)
    winner: string
    @Field(() => String)
    get_jackpot: string
    @Field(() => String)
    count_ticket: string
    @Field(() => String)
    count_user: string
    @Field(() => String)
    jackpot_balance: string
    @Field(() => String)
    jackpot_count: string
}