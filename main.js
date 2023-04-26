const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.login("process.env.SECRET");

const prefix = "q.";
const embed = new Discord.RichEmbed();
const os = require("os");
const { stringify } = require("querystring");
const { request } = require("https");
const ytdl = require("ytdl-core");

client.on("ready", () => {
  console.log(
    `Logged in as ${client.user.tag} on ${client.guilds.size} servers!`
  );
  client.user.setGame(`q.help for commands`);
  console.log(client.user.id);
  client.guilds.forEach((guild) => {
    console.log(guild.name);
  });
});

client.on("message", (msg) => {
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (msg.author.bot) {
    return;
  }

  //---[PASS]-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  //     else if (msg.content.startsWith("quack")) {
  //     if(msg.channel.id !== '368007471891087361')return;
  //       msg.delete();
  //         var role = msg.guild.roles.find('name','Newbie')
  //         console.log("Role found");
  //         msg.member.removeRole(role.id);
  //         msg.channel.send('Access Granted, Welcome! 🦆')
  //         .then(message => {
  //           message.delete(3000);})

  //   }

  //---[ID]--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "myid") {
    msg.channel.send(
      `Hello, <@!${msg.author.id}> your Discord ID is: ${msg.author.id}`
    );
  }

  //----[PING]-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "ping") {
    var pingtime = Math.floor(client.ping);
    msg.channel.send(
      `*Pong!* :ping_pong:   <@!${msg.author.id}>'s Ping is ${pingtime}ms`
    );
  }

  //---[lEVEL]-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  //else if ()

  //member.guild.channels.get('369623944346468353').send('GG <@!${member.user.id}>, you just advanced to level 1 fam! uwu')

  //---[INVITE]----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "invite") {
    msg.channel.send(
      `I sent it in a **Private Message**, <@!${msg.author.id}>.`
    );
    msg.author.send(
      "**Here's the link you requested. Your're welcome!** https://discordapp.com/api/oauth2/authorize?client_id=440849246409981963&permissions=0&scope=bot"
    );
  }

  //---[HELP]------------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "help") {
    msg.channel.send(
      new Discord.RichEmbed()
        .setTitle("Quentin - Help")
        .setDescription(
          ":small_red_triangle_down: Here is Quentin's help menu\n\n       - ***q.*** : The bot's prefix. \n\n       - ***ping***  Allows you to check your ping time.\n\n       - ***meme*** : View a meme!\n\n       - ***avatar*** : View your own or a user's avatar.\n\n       - ***myid*** : View your discord ID.\n\n       - ***server*** : View the current servers statistics.\n\n       - ***ascii*** : Inputs the text you put after ascii in a nice way.\n\n       - ***invite*** : Gives you the bots invite link!\n\n       - ***coinflip*** : Flips a coin.\n\n       - ***dice*** : Rolls a dice."
        )
        .setColor("#FFD700") // this generates a random color. If you want a specific color use the hex codes
        .setThumbnail(client.user.avatarURL)
    );
  }

  //---[SERVER]----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "server") {
    msg.channel.send(
      new Discord.RichEmbed()
        .setTitle("**Current Servers Info:**")
        .setDescription("Here's some public info about this server:")
        .setColor("#FFD700")
        .addField("Server Name :desktop:", `${msg.guild.name}`, false)
        .addField("Members :couple:", `${msg.guild.members.size}`, false)
        .addField("Owner :man_in_tuxedo: ", `${msg.guild.owner}`, false)
        .addField(
          "Guild Region :triangular_flag_on_post: ",
          `${msg.guild.region}`,
          false
        )
        .addField("Created At :space_invader:", `${msg.guild.createdAt}`, false)
        .setFooter("Server info requested by " + msg.author.id)
    );
  }

  //---[STATS]-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "stats") {
    msg.channel.send(
      new Discord.RichEmbed()
        .setTitle(`Quentin - Stats`)
        .setDescription("Here are the current stats for this bot:")
        .setColor("#FFD700")
        .addField(
          "Statistics:",
          `:man_in_tuxedo: **Creator**: Jonno#3707 \n\n:medal: **Version**: v1.0.1 \n\n:desktop: **Servers**: ${
            client.guilds.size
          } \n\n:couple: **Users**: ${
            client.users.size
          } \n\n:joystick: **Max RAM:** *${
            Math.floor((os.totalmem() / 1024 ** 3) * 100) / 100
          }G* \n\n:pager: **Server OS**: ${os.type()} \n\n:office: **Discord Server**: https://discord.gg/xvvhY4v`,
          false
        )
        .setThumbnail(client.user.avatarURL)
    );
  }

  //---[EMBED]-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  //  else if(msg.content ===(prefix)+'embed'){
  //   msg.channel.send(
  //     new Discord.RichEmbed()
  //       .setTitle("Embed Title")
  //       .setDescription("Embed Description \nAnother line of Description")
  //       .setColor("#FFD700")// this generates a random color.If you want a specific color use the hex codes
  //       .addField("Embed Field","sub-line 1",false)// this creates a line and its description
  //       .addField("Embed Field","sub-line 2",false)//same
  //       .setFooter("Embed Footer")
  //       .setThumbnail(client.user.avatarURL)

  //     );
  //   }

  //---[SAY]-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content.startsWith(prefix + "say")) {
    if (msg.member.hasPermission("MANAGE_MESSAGES"))
      msg.channel.send(msg.content.substr(msg.content.indexOf(" ") + 1));
    msg.delete();
  }

  //---[KISS]------------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content.startsWith(prefix + "kiss")) {
    var mentions = msg.mentions.users
      .filter((user) => {
        if (user !== client.user) return user;
      })
      .first();
    var member = msg.guild.member(mentions) || msg.member;
    msg.channel.send(
      new Discord.RichEmbed()
        .setTitle(":heart: - Gasp!")
        .setDescription(
          member.user !== msg.author
            ? `<@!${msg.author.id}> stared into <@!${member.user.id}>'s eyes as he leaned forward. <@!${member.user.id}> began to blush. "Kiss me" said <@!${msg.author.id}> with confidence. <@!${member.user.id}> leant in and was met with a kiss.
                                                \n\n*QUICK BEAT 'N' THAT YGM CHEYS*`
            : `I'm not sure how but you've managed to kiss yourself. Well done, <@!${msg.author.id}>.`
        )
        .setColor("#FFD700") // this generates a random color.If you want a specific color use the hex codes
        .setThumbnail(
          "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fkissu.JPG?1538387652798"
        )
    );
  }

  //---[GASP]------------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "gasp") {
    msg.channel.send(
      new Discord.RichEmbed()
        .setColor("#FFD700") // this generates a random color.If you want a specific color use the hex codes
        .setImage(
          "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2FMEEE2.jpg?1532564626061"
        )
    );
    msg.delete();
  }

  //---[ASCII]-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content.startsWith(prefix + "ascii")) {
    var figlet = require("figlet");
    let data = msg.content.split(" ").slice(1).join(" ");
    if (!data)
      return msg.reply(":no_entry:**You need to enter a text!**:no_entry:");
    msg.delete();
    figlet(`${data}`, function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      msg.channel.send(`\`\`\`\n${data}\`\`\``);
    });
  }

  //---[COIN FLIP]-------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content.startsWith(prefix + "coinflip")) {
    var coinc = ["Heads", "Tails"];
    var coin = coinc[Math.floor(Math.random() * coinc.length)];
    msg.reply("flipped a coin and got: " + coin.toString());
  }

  //---[TIMED MESSAGE]---------------------------------------------------------------------------------------------------------------------------------------------------------

  // else if (msg.content === "q.loop") {
  //   var interval = setInterval (function () {
  //     msg.channel.send("dlm!bump")
  //     }, 9 * 60 * 60 * 1000);
  //     msg.delete();

  //  }

  //---[AVATAR]----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content.startsWith(prefix + "avatar")) {
    var mentions = msg.mentions.users
      .filter((user) => {
        if (user !== client.user) return user;
      })
      .first();
    var member = msg.guild.member(mentions) || msg.member;
    let avataruser = member.user.displayAvatarURL;
    msg.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          member.user !== msg.author
            ? `Hello **<@!${msg.author.id}>**\nhere is <@!${member.user.id}>'s avatar.`
            : `Here is your avatar, <@!${msg.author.id}>.`
        )
        .setColor("#FFD700")
        .setImage(avataruser)
    );
  }

  //---[MEMES]-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content === prefix + "meme") {
    var memes = [
      "http://i3.kym-cdn.com/photos/images/newsfeed/001/217/729/f9a.jpg",
      "https://i.ytimg.com/vi/HaLbRJ9VR68/maxresdefault.jpg",
      "https://i.ytimg.com/vi/mQ8lrBjy-7E/maxresdefault.jpg",
      "https://i.imgflip.com/20lq06.jpg",
      "https://img.memecdn.com/grandma-computer-expert_o_1142296.jpg",
      "https://i1.wp.com/picsmine.com/wp-content/uploads/2017/03/Hey-girls-lets-burn-some-rubber-Car-Memes.jpg?resize=640%2C773",
      "https://fthmb.tqn.com/8cdFIfAhwNAdNAJelEebxEhrmTI=/735x0/success-56a9fd1f3df78cf772abee09.jpg",
      "http://solifequotes.com/wp-content/uploads/2016/07/35-Hilarious-Memes-1-Hilarious-Memes.jpg",
      "https://i.imgflip.com/136tm8.jpg",
      "http://images.memes.com/meme/5325.jpg",
      "https://i.imgflip.com/20kax7.jpg",
      "http://cdn.ebaumsworld.com/mediaFiles/picture/2388802/84820180.jpg",
      "https://i.pinimg.com/736x/9b/77/97/9b7797ce389244b0da6837f95fa1e112--generator-memes-monkey-memes.jpg",
      "https://media.licdn.com/mpr/mpr/shrinknp_800_800/AAEAAQAAAAAAAASIAAAAJGUxNzViZjY3LTdmYzQtNGNlMC05MDk1LWM5ZTJlYjI0OWNhYw.png",
      "https://pbs.twimg.com/media/DO4xwBPX0AAHs0X.jpg",
      "http://s2.quickmeme.com/img/a6/a602774c48e075657a37b3a60bec501e58f0269dd7ce71ee0c7adf9ce6f96987.jpg",
      "http://cdn2-www.craveonline.com/assets/uploads/2017/07/0-900x713.jpg",
      "https://virily.com/wp-content/uploads/2017/03/d465cdff909bb9b3327827bf89c0061d.jpg",
      "http://cdn.ebaumsworld.com/mediaFiles/picture/730195/85460504.jpg",
      "https://appamatix.com/wp-content/uploads/2015/07/Ice_cubes_float.png",
      "http://i0.kym-cdn.com/photos/images/newsfeed/000/264/057/d1b.jpg",
      "https://i.imgflip.com/hwxkx.jpg",
      "https://i.imgflip.com/129fam.jpg",
      "https://i.imgflip.com/129fmf.jpg",
      "https://i.imgflip.com/20nhuk.jpg",
      "https://pbs.twimg.com/media/DOzFlcuW0AA81Ad.jpg",
      "https://i.imgflip.com/c01na.jpg",
      "http://thepopularteen.com/wp-content/uploads/2015/09/promposal.jpg",
      "https://i.pinimg.com/736x/43/78/63/43786326c61ecec1ddd810bc6e71e930--wolf-warriors-teen-wolf-humor.jpg",
      "https://images.rapgenius.com/8e6c529155e7f05303dd2f6ef3036a8b.400x571x1.jpg",
      "https://pbs.twimg.com/media/DOycWnxVwAA37LJ.jpg",
      "http://visionity.com/wp-content/uploads/2016/06/Grab-your-umbrella-adult-meme.jpg",
      "https://i.imgflip.com/t9w98.jpg",
      "https://i.imgflip.com/20l7a5.jpg",
      "https://i.imgflip.com/g2aql.jpg",
      "https://i.imgflip.com/t8evn.jpg",
      "https://i.imgflip.com/dt3op.jpg",
      "https://i.imgflip.com/20mm5k.jpg",
      "https://i.imgflip.com/129fzx.jpg",
      "https://i.imgflip.com/1m9zim.jpg",
      "https://i.imgur.com/zk85pjN.jpg",
      "https://i.imgflip.com/li65g.jpg",
      "https://i.imgflip.com/1uu0w7.jpg",
      "https://i.imgflip.com/goo47.jpg",
      "https://i.imgflip.com/1rgwbz.jpg",
      "https://i.imgflip.com/yepnf.png",
      "https://pics.me.me/he-birth-of-an-autist-9gag-memes-are-dank-af-18831993.png",
      "https://images-cdn.9gag.com/photo/avrzLN5_700b.jpg",
      "https://i.imgflip.com/ukvtb.jpg",
      "https://i.imgflip.com/fc1hn.jpg",
      "http://i0.kym-cdn.com/photos/images/original/001/165/960/049.jpg",
      "https://pics.me.me/living-with-parents-v-s-living-alone-idk-about-you-people-23816783.png",
      "https://i.imgflip.com/1uikdz.jpg",
      "https://pbs.twimg.com/media/DOuk8n0XkAAzNnN.jpg",
    ];

    var memesans = memes[Math.floor(Math.random() * memes.length)];
    var memesanswer = memesans.toString();

    msg.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Haha, <@!${msg.author.id}>!`)
        .setColor("#FFD700")
        .setImage(memesanswer)
    );
  }

  //---[DICE]------------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content == prefix + "dice") {
    var dice = ["1", "2", "3", "4", "5", "6"];
    var dicer = dice[Math.floor(Math.random() * dice.length)];
    msg.channel.send(
      `<@!${msg.author.id}> rolled a :game_die:  and the result is ` + dicer
    );
  }

  let cont = msg.content.slice(prefix.length).split(" ");
  let argspurge = cont.slice(1);

  if (msg.author.bot) {
    return;
  }

  //---[PURGE]-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  else if (msg.content.startsWith(prefix + "purge")) {
    msg.delete();

    async function purge() {
      if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        msg.reply("You need the Manage Messages permission ");

        return;
      }

      if (isNaN(argspurge[0])) {
        msg.channel.send(
          `Please use a number.\n ``USAGE: ${prefix}purge (amount)```
        );

        return;
      }

      const fetched = await msg.channel.fetchMessages({ limit: argspurge[0] });
      console.log(fetched.size + " messages found.deleting.........");

      msg.channel
        .bulkDelete(fetched)
        .catch((error) => msg.channel.send(`Error: ${error}`));
    }

    purge();
  }

  if (msg.channel.id === "440849246409981963") {
    if (isNaN(msg.content)) {
      msg.channel
        .send(`Please enter the bots **Client ID** only, <@!${msg.author.id}>`)
        .then(msg.delete());
    } else if (msg.content.length != client.user.id.length) {
      msg.channel
        .send(`Please enter the bots **Client ID** only, <@!${msg.author.id}>`)
        .then(msg.delete());
    } else {
      var botID = msg.content;
      var botInviteLink = `https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=104188993`;
      msg.channel.send(
        new Discord.RichEmbed()
          .setTitle("Bot-listing")
          .setColor("RANDOM")
          .setDescription(
            `**Bot Listing** - [link](${botInviteLink})\n**Bot inviter**-${msg.author.username}`
          )
      );
    }
  }
});

//---[ICON CHANGE]-----------------------------------------------------------------------------------------------------------------------------------------------------------

function changeGuildIcon(guild) {
  var icons = new Array();

  icons[0] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack1.jpg?1546874576807";
  icons[1] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack2.png?1546874572153";
  icons[2] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack3.png?1546874572398";
  icons[3] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack4.png?1546874572493";
  icons[4] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack5.png?1546874573152";

  icons[5] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack6.png?1546874579583";
  icons[6] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack7.png?1546874573519";
  icons[7] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack8.png?1546874575122";
  icons[8] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack9.png?1546874577024";
  icons[9] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack10.png?1546874580338";

  icons[10] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack11.png?1546874574238";
  icons[11] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack12.png?1546874576295";
  icons[12] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack13.png?1546874577383";
  icons[13] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack14.png?1546874572295";
  icons[14] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack15.png?1546874574810";

  icons[15] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack16.png?1546874573738";
  icons[16] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack17.png?1546874572757";
  icons[17] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack18.png?1546874574530";
  icons[18] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack19.png?1546874575676";
  icons[19] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack20.png?1546874575422";

  icons[20] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack21.png?1546874577725";
  icons[21] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack22.png?1546874578741";
  icons[22] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack23.png?1546874578528";
  icons[23] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack24.png?1546874575992";
  icons[24] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack25.png?1546874576598";

  icons[25] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack26.png?1546874574018";
  icons[26] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack27.png?1546874580237";
  icons[27] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack28.png?1546874573082";
  icons[28] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack29.png?1546874579122";
  icons[29] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack30.png?1546879112248";

  icons[30] =
    "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack31.png?1552395044731";
  //       icons[31] = "";
  //       icons[32] = "";
  //       icons[33] = "";
  //       icons[34] = "";

  //--------------------[HALLOWEEN]

  //       icons[0] = "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack%20halloween%201.png?v=1570896769674";
  //       icons[1] = "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack%20halloween%202.png?v=1570896772984";
  //       icons[2] = "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack%20halloween%203.png?v=1570896780527";
  //       icons[3] = "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack%20halloween%204.png?v=1570896783452";
  //       icons[4] = "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack%20halloween%205.png?v=1570896788405";

  //       icons[5] = "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack%20halloween%206.png?v=1570898916206";
  //       icons[6] = "https://cdn.glitch.com/221cf221-9488-4246-bae1-269b2e87266f%2Fquack%20halloween%207.png?v=1570898919261";
  //       icons[7] = "";
  //       icons[8] = "";
  //       icons[9] = "";

  //--------------------[CHRISTMAS]

  //       icons[0] = "";
  //       icons[1] = "";
  //       icons[2] = "";
  //       icons[3] = "";
  //       icons[4] = "";

  //       icons[5] = "";
  //       icons[6] = "";
  //       icons[7] = "";
  //       icons[8] = "";
  //       icons[9] = "";

  /*  
    Here is the math equation susbstitute:
    
    Line Beginning at (for (i = a.length - 1; i > 0; i--) {) - Here it says i is basically the length of the 
    array in this case 38 - 1 = 37, if i which is 37 is greater then 0 minus 1, this is a for loop so it does 
    this till it is 0 so like 37 , 36 , 35 etc.
    
    Next Line - Here j = floor which is a method that rounds a number to the whole state so 3.56 is 4 2.1 is 2, 
    in bracets it is random which is a method that gets a number between 0 and 1.
    
    Next Line - Here we establish that x is value of a[]
    
    Next Line - Here we change the value of a[i] to a[j] so now a[i]
    */

  function shuffle(a) {
    var j, x, i; //var is important
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  /*
    Here it says icons shuffle is shuffle and a is 
    basically subbed to icons so a is an array in this instance.
    */

  var icons_shuffle = shuffle(icons);

  console.log(icons_shuffle);

  var iconsans = icons_shuffle[icons_shuffle.length - 1];
  icons_shuffle.pop();

  guild.setIcon(iconsans).then(console.log).catch(console.error);
}

client.on("ready", () => {
  let guild = client.guilds.get("242786073040781322");
  setInterval(
    changeGuildIcon,
    1000 /* < milliseconds */ * 60 /* < seconds */ * 60 /* < minutes */,
    guild
  );
});

//---[ADDROLE]---------------------------------------------------------------------------------------------------------------------------------------------------------------

client.on("message", (message) => {
  if (message.content.toLowerCase().startsWith("!addrole")) {
    var args = message.content.toLowerCase().split(" ");
    console.log(args);

    if (args[1] === "red") {
      var role = message.guild.roles.find("name", "Red");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "pink") {
      var role = message.guild.roles.find("name", "Pink");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "purple") {
      var role = message.guild.roles.find("name", "Purple");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "blue") {
      var role = message.guild.roles.find("name", "Blue");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "sea") {
      var role = message.guild.roles.find("name", "Sea Green");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "green") {
      var role = message.guild.roles.find("name", "Green");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "yellow") {
      var role = message.guild.roles.find("name", "Yellow");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "orange") {
      var role = message.guild.roles.find("name", "Orange");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "white") {
      var role = message.guild.roles.find("name", "White");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "black") {
      var role = message.guild.roles.find("name", "Black");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "minecraft") {
      var role = message.guild.roles.find("name", "Minecraft 🎮");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "overwatch") {
      var role = message.guild.roles.find("name", "Overwatch 🎮");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "league") {
      var role = message.guild.roles.find("name", "League 🎮");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "smash") {
      var role = message.guild.roles.find("name", "Smash Bros 🎮");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "runescape") {
      var role = message.guild.roles.find("name", "Runescape 🎮");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "fortnite") {
      var role = message.guild.roles.find("name", "Fortnite 🎮");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "nsfw") {
      var role = message.guild.roles.find("name", "NSFW 🔞");
      console.log("Role found");
      message.member.addRole(role.id);
      message.channel.send("Role successfully added!").then((message) => {
        message.delete(3000);
      });
    }

    message.delete();
  }
});

//---[REMOVEROLE]------------------------------------------------------------------------------------------------------------------------------------------------------------

client.on("message", (message) => {
  if (message.content.toLowerCase().startsWith("!removerole")) {
    var args = message.content.toLowerCase().split(" ");
    console.log(args);

    if (args[1] === "red") {
      var role = message.guild.roles.find("name", "Red");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "pink") {
      var role = message.guild.roles.find("name", "Pink");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "purple") {
      var role = message.guild.roles.find("name", "Purple");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "blue") {
      var role = message.guild.roles.find("name", "Blue");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "sea green") {
      var role = message.guild.roles.find("name", "Sea Green");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "green") {
      var role = message.guild.roles.find("name", "Green");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "yellow") {
      var role = message.guild.roles.find("name", "Yellow");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "orange") {
      var role = message.guild.roles.find("name", "Orange");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "white") {
      var role = message.guild.roles.find("name", "White");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "black") {
      var role = message.guild.roles.find("name", "Black");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "minecraft") {
      var role = message.guild.roles.find("name", "Minecraft 🎮");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "overwatch") {
      var role = message.guild.roles.find("name", "Overwatch 🎮");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "league") {
      var role = message.guild.roles.find("name", "League 🎮");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "smash") {
      var role = message.guild.roles.find("name", "Smash Bros 🎮");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "runescape") {
      var role = message.guild.roles.find("name", "Runescape 🎮");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "fortnite") {
      var role = message.guild.roles.find("name", "Fortnite 🎮");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    } else if (args[1] === "nsfw") {
      var role = message.guild.roles.find("name", "NSFW 🔞");
      console.log("Role found");
      message.member.removeRole(role.id);
      message.channel.send("Role successfully removed!").then((message) => {
        message.delete(3000);
      });
    }

    message.delete();
  }
});

//---[WELCOME MESSAGE]-------------------------------------------------------------------------------------------------------------------------------------------------------

client.on("guildMemberAdd", (member) => {
  member.guild.channels
    .get("606807191571267603")
    .send(
      `Welcome! <@!${member.user.id}>, please read the rules before continuing to explore the server!`
    );
});

//---[]----------------------------------------------------------------------------------------------------------------------------------------------------------------------

client.login(process.env.BOT_TOKEN);
