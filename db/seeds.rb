if(Role.count == 0)
  puts 'creating roles'
  admin = Role.create(
    name: 'admin'
  )

  member = Role.create(
    name: 'member'
  )
else 
  puts 'roles already seeded' 
end



if(User.count == 0)
  puts 'creating users'
  User.create(
    username: 'admin',
    password: 'password',
    password_confirmation: 'password',
    role: admin,
    email: 'jdminster@yahoo.com'
  )

  User.create(
    username: 'member',
    password: 'password',
    password_confirmation: 'password',
    role: member,
    email: 'jmembro@yahoo.com'
  )

  nobody = User.create(
    username: 'nobody',
    password: 'password',
    password_confirmation: 'password',
    role: member,
    email: 'nobody@yahoo.com'
  )

  Score.create(
    name: nobody.username,
    score: 0,
    user: nobody
  )
else
  puts 'users already seeded'
end





if Achievement.count == 0 && AchievementCategory.count == 0
  puts 'Creating achievement categories'
  ws = AchievementCategory.create(
    name:'Words Solved',
    description: 'The number of words solved all time by the user'
  )
  lr = AchievementCategory.create(
    name:'Levels Reached',
    description: 'The highest level reached in the game'
  )
  pat = AchievementCategory.create(
    name:'Points All Time',
    description: 'Points collected all time'
  )


  puts 'creating achievements'
  Achievement.create(
    name:'3 Words Solved',
    num_to_complete: 3,
    achievement_category: ws
  )
  Achievement.create(
    name:'10 Words Solved',
    num_to_complete: 10,
    achievement_category: ws
  )
  Achievement.create(
    name:'50 Words Solved',
    num_to_complete: 50,
    achievement_category: ws
  )
  Achievement.create(
    name:'100 Words Solved',
    num_to_complete: 100,
    achievement_category: ws
  )
  Achievement.create(
    name:'1000 Words Solved',
    num_to_complete: 1000,
    achievement_category: ws
  )


  Achievement.create(
    name:'Reached Level 3',
    num_to_complete: 3,
    achievement_category: lr
  )
  Achievement.create(
    name:'Reached Level 5',
    num_to_complete: 5,
    achievement_category: lr
  )
  Achievement.create(
    name:'Reached Level 10',
    num_to_complete: 10,
    achievement_category: lr
  )
  Achievement.create(
    name:'Reached Level 15',
    num_to_complete: 15,
    achievement_category: lr
  )
  Achievement.create(
    name:'Reached Level 20',
    num_to_complete: 20,
    achievement_category: lr
  )


  Achievement.create(
    name:'2000 Points',
    num_to_complete: 2000,
    achievement_category: pat
  )

  Achievement.create(
    name:'10000 Points',
    num_to_complete: 10000,
    achievement_category: pat
  )
  Achievement.create(
    name:'50000 Points',
    num_to_complete: 50000,
    achievement_category: pat
  )
  Achievement.create(
    name:'100000 Points',
    num_to_complete: 100000,
    achievement_category: pat
  )
else 
  puts 'achievements already seeded'
end

puts 'seeds planted'