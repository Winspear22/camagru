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

	@Column({ nullable: true })
	generatedId: number;

	@Column({ nullable: true })
	email: string;

	@Column({nullable: true})
	user_status: string;
}