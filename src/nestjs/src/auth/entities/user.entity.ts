import { 
    Entity,
    Column,
    PrimaryGeneratedColumn } from 'typeorm';
  
@Entity()
export class UserEntity 
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ nullable: true })
	password: string;

    @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
    generatedId: string;
	
	@Column({ nullable: true })
	email: string;

	@Column({ type: 'text', nullable: true })
	accessToken: string;
  
	@Column({ type: 'text', nullable: true })
	refreshToken: string;

	@Column({nullable: true})
	user_status: string;
}