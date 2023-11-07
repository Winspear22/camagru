import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    JoinColumn } from 'typeorm';
  
@Entity()
export class UserEntity 
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ nullable: true })
	password: string;

	@Column({ nullable: true, type: 'bigint' })
	generatedId: number;
	
	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	accessToken: string;

	@Column({ nullable: true })
	refreshToken: string

	@Column({nullable: true})
	user_status: string;
}