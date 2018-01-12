CREATE TABLE if not exists users2 (
  id TEXT not null UNIQUE,
  picture TEXT NOT NULL DEFAULT '',
  birthday DATE,
  h_color TEXT NOT NULL DEFAULT '',
  e_color TEXT NOT NULL DEFAULT '',
  hobby TEXT NOT NULL DEFAULT '',
  gender TEXT NOT NULL DEFAULT '',
  first TEXT NOT NULL DEFAULT '',
  last TEXT NOT NULL DEFAULT ''
);

CREATE TABLE if not exists friends (
  user_id TEXT NOT NULL,
  friend_id TEXT NOT NULL,
  FOREIGN KEY ( user_id ) REFERENCES users( id ),
  FOREIGN KEY ( friend_id ) REFERENCES users( id )
);


