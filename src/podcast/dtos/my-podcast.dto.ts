import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';
import { CoreOutput } from './output.dto';

@InputType('MyPodcastInputType')
export class MyPodcastInput extends PickType(Podcast, ['id']) {}

@ObjectType()
export class MyPodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}
