SELECT * FROM notes

SELECT * FROM notes LIMIT 5;

SELECT * FROM notes
ORDER BY id ASC;

SELECT * FROM notes
ORDER BY id DESC;

SELECT * FROM notes 
WHERE title = '5 life lessons learned from cats';

SELECT * FROM notes 
WHERE title LIKE '%cats%';


UPDATE notes
  SET title = 'New Title'
  WHERE id = '1005';


INSERT INTO notes
  (title, content)
  VALUES
  ('New Title', 'New Content');


DELETE FROM notes WHERE id = '1005'; 
