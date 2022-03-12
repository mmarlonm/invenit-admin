export class Base {
  id : string;
  fechaCreacion : Date;
  fechaActualizacion : Date;
  propietario: string;
  usuarioCreacion: string;
}
export class User extends Base {
  avatar : string;
  username: string;
  email : string;
  activo : boolean;
  ultimoAcceso: Date;
  group: any;
  tracker:any;
  createdAt : string;
  updatedAt: string;
}

export interface LoginMessage {
  ok: boolean,
  message: string,
  user: User
  token: string;
}

export class Auth {
  username: string;
  password: string;
}

export class Group extends Base {
  name: string;
  description: string;
  active: boolean;
  usuarios: User[];
  createdAt : string;
  updatedAt: string;
}

export class Permission extends Base {
  action: string;
  relation: string;
  model: any;
  group: any;
}

export class Model extends Base {
  name: string;
  identity: string;
  attributes: any;
  permissions: Permission[];
}

export class Tracker extends Base {
  nombre: string;
  imei: string;
  GSM : string;
  device : string;
  createdAt : string;
  updatedAt: string;
}

export class Gsm extends Base {
  numero: string;
  operadora: string;
  APN : string;
  createdAt : string;
  updatedAt: string;
}

export class Device extends Base {
  marca: string;
  modelo: string;
  fotografia : string;
  createdAt : string;
  updatedAt: string;
}

export class GeoPoint extends Base{
  altitud : string;
  longitud : string;
  latitud : string;
}