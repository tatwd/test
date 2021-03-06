-- 触发器

-- insert 类型触发器
-- 会为插入记录创建一张内存临时表 inserted
create trigger tr__t_student__after_insert
on t_student after insert
as
begin
    declare @age int 
    select @age=age from inserted 
    if @age > 120 
        rollback transaction -- 撤销操作
end

-- delete 类型触发器
-- 会为插入记录创建一张内存临时表 deleted
-- TODO: add example

-- update 类型触发器
-- 会先建立 deleted 表
-- 再建立 inserted 表
-- TODO: add example