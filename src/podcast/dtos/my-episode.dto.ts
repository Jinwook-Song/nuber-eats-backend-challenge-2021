import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Episode } from '../entities/episode.entity';
import { CoreOutput } from './output.dto';

@InputType('MyEpisodeInputType')
export class MyEpisodeInput extends PickType(Episode, ['id']) {
  @Field((type) => Int)
  @IsInt()
  podcastId: number;
}

@ObjectType()
export class MyEpisodeOutput extends CoreOutput {
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;
}
