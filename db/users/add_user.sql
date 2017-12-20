INSERT INTO users ( id, picture, first, last ) VALUES ( $1, $2, $3, $4 )
RETURNING *;