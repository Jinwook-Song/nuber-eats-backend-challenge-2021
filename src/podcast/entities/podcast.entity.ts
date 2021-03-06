import { Episode } from './episode.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, Min, Max, IsNumber, IsPositive } from 'class-validator';
import { Column, Entity, OneToMany, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Review } from './review.entity';
import { User } from '../../users/entities/user.entity';
import { truncate } from 'fs';

@InputType('PodcastInputType', { isAbstract: true })
@Entity()
@ObjectType()
export class Podcast extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => String)
  @IsString()
  category: string;

  @Column({type:'float', default: 0 })
  @Field((type) => Number)
  @IsPositive()
  @Min(0)
  @Max(5)
  rating: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.podcasts, {
    onDelete: 'CASCADE',
  })
  creator: User;

  @RelationId((podcast: Podcast) => podcast.creator)
  creatorId: number;

  @OneToMany(() => Episode, (episode) => episode.podcast, { nullable: true })
  @Field((type) => [Episode], { nullable: true })
  episodes?: Episode[];

  @OneToMany(() => Review, (review) => review.podcast, { nullable: true })
  @Field((type) => [Review], { nullable: true })
  reviews?: Review[];
}
