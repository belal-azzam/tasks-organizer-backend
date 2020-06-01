import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne, JoinColumn, BeforeInsert
} from "typeorm";
import * as bcrypt from 'bcryptjs';

import {__hash} from "../../common/helpers";
import {RoleEntity} from "./role.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    role_id: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;

    @ManyToOne(type => RoleEntity, role => role.users)
    @JoinColumn({name: 'role_id'})
    role: RoleEntity;
    @BeforeInsert()  async hashPassword() {
        this.password = await __hash(this.password);
    }
}

//
