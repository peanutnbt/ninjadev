exports.up = (ctx) => {
	console.log('up');
	//   create table "User" (
	// 	ID serial primary key,
	// 	username varchar(25) not null unique,
	// 	"password" text not null,
	// 	email text not null,
	// 	confirm_email INT default 0,
	// 	is_ban INT default 0,
	// 	"role" varchar(20) not null default 'Member', -- Member, Admin
	// 	phone varchar(20),
	// 	first_name varchar(20) not null,
	// 	last_name varchar(20) not null,
	// 	created_time TIMESTAMP not null default CURRENT_TIMESTAMP,
	// 	modified_time TIMESTAMP not null default CURRENT_TIMESTAMP,
	// 	facebook_id TEXT,
	// 	link_avatar TEXT not null default '/public/img/avatar-default.jpg'
	// );

}

exports.down = (ctx) => {
  console.log('down');
}
