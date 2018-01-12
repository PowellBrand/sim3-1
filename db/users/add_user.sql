INSERT INTO users2 ( id, picture, first, last ) VALUES ( $1, $2, $3, $4 )
RETURNING *;