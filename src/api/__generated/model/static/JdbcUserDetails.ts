import type {SimpleGrantedAuthority} from './';

export interface JdbcUserDetails {
    id: number;
    authorities: Array<SimpleGrantedAuthority>;
    password?: string | undefined;
    username: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
}
