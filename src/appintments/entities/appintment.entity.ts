import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, OneToMany, ManyToOne } from "typeorm";

@Entity('appintments')
export class Appintment {



    @PrimaryGeneratedColumn('uuid')
      id: string;

    @Column({ type: 'varchar' })
      status: string;
    @CreateDateColumn({ type: 'timestamp' })
      created_at: Date;

    @Column({ type: 'timestamp' })
        dateTime: Date;




        
    @ManyToOne(() => User, (user) => user.appintments)
      user: User;
}
