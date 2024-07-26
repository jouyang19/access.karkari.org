import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";
import fetch from "node-fetch";
import { Readable } from "stream";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books_preprocessing_test").collect();
  },
});

// List of storage IDs
const storageIds = [
  "kg2f8k5kmae7mq5t222nrz3dq16xm6nb",
  "kg22abt06tatftzpe8zha9v46x6xmdnv",
  "kg24nrv6ym0tnpbse3crfc64816xnm4g",
  "kg245dzgg2trqk77bmg9ceaaj96xmjzw",
  "kg2cmb7e6qxqmjzkj8w32ysdzd6xmcay",
  "kg214gwee0gev1qw3r9spksk196xm0c4",
  "kg2012ys13t45bt5st2ekzc0kh6xncfb",
  "kg2fnhb0nsyjpqwd0gkazj3xw16xm9gh",
  "kg29vz5g6dbvnt9k581j1nm0cn6xmy7m",
  "kg2fkx0q9t9tdqqqxhtc0z097s6xm2kv",
  "kg2a8syh5pe06pnq2a7aezc2gh6xmjkn",
  "kg2eskynkqgcmzd3k4ek40x9s56xm6y8",
  "kg22g3zb2eregprej2gjvtyng56xn749",
  "kg24jxpze4t7j2jzcf6tnkntah6xn8gg",
  "kg29yv2rj0c9xcx38cvywr1a7s6xnxh6",
  "kg26rmd64k8cjnqaz1353eyxjd6xnrbm",
  "kg23vncvve2r2nrp2k3y4jgg9s6xm9w0",
  "kg26mngj209807gtvsc1f7pac16xn26m",
  "kg29qwbyqycwz6p5t1sk31rw9h6xnept",
  "kg22chr360xdyes72gwx7x7qg56xmvgh",
  "kg25y2gq26p2ty4tnyv5x7thmx6xn7b8",
  "kg2fafq91cjkxhm7zeehc3h8t56xmmyg",
  "kg21zg1fe16gfkfp3szvfyhw1s6xnx32",
  "kg2bt7ftka6d1srz1b38shfv3d6xnkk6",
  "kg2307g44tnh9hp20dr40g4atx6xnpmv",
  "kg225dv3sydbpxgbb780c2cmrn6xme8y",
  "kg258b94mnxynh81gwaytkg9196xm9mt",
  "kg2fe500rtkmwvbgxknmkb6n9h6xmnyh",
  "kg236w7aby61n2tc6f69b91ak56xmas8",
  "kg25nddqz96kxhqt0cj25stg916xn6q6",
  "kg2451sqw1k4j06ytnvw9cb8cs6xngww",
  "kg2dgwwvc60x76xkx8n9gem7zd6xm67z",
  "kg20yh6csdcjch2txp08t3nvzh6xn38f",
  "kg22r0bgx0gcs0tp2gcpjnv7v16xmfbb",
  "kg2eb3ttnkhbbfvfve0ws6ckj96xnv7b",
  "kg2595tzys2hw09nqd88p1rfjh6xnr2b",
  "kg21vb3rc02kn4t9xwpg67qn6d6xnt6n",
  "kg2a3j52rwdg9xst2hth0k3qj16xnnea",
  "kg22c46szvwk9g1r2pb5rytjmh6xmwd9",
  "kg2bsyyvr04h06e8217xkk659h6xma5g",
  "kg2cpzcr49xw9gnwfjc4mf85ex6xn7cb",
  "kg2f153z9v03p35amwjkmknmc16xmcac",
  "kg20nbrrv8edw3vmqjv1yt5ya96xny01",
  "kg2bhzqj24nxgfbvf3002vx3tn6xmpv8",
  "kg2eq49r4xxpc3brbeqtxd5dyh6xm5ck",
  "kg217jat198br4kaq7fg42631x6xm0x5",
  "kg26k7ppg6kj58a7yvsnmvph996xn8mf",
  "kg27wgda97dt1nbhzy38f5f1bn6xm68z",
  "kg24e0qvw5xdkcdahsz228esd96xmat3",
  "kg21d8xtwfc457pv8ssn2qjb4d6xn1pb",
  "kg2ehdek7pks48gsrkrfhnr6k56xm2jk",
  "kg22z446y95qsgd4prkwmc1a8d6xmvnj",
  "kg2c3pf5rghnq7fmcd90r18rad6xmjj4",
  "kg29xn21c1433fe5a9pyy7s0td6xn5fd",
  "kg22h1pxtfwsweqjdhd12g1ean6xn0j6",
  "kg2fnwmhfc29da2qxy40m7f9v96xne8v",
  "kg2anx9q1q1grw6gw4j2zmd5x96xmk9k",
  "kg2ahk3xmrrabj1crwag8mj92x6xne81",
  "kg2c9n95n57gr9hnyndqh8njg56xn081",
  "kg288hrj2e7cnebfjeqcfykf6d6xnpxy",
  "kg2cz94g58zwb2tmvn2kma437h6xm6nt",
  "kg27vsp87hkqdpgfb2tynch1956xm1zf",
  "kg23xv34m5vrzfb4ze3acy9ceh6xmqbq",
  "kg2earm1dh6qkyn1k3233vrdy16xnnbn",
  "kg239942fkdsy0meneh9a1a5p96xn1d6",
  "kg29khbgq6htf4ysk0wwqvfz3x6xnawb",
  "kg2fdf0hrc7d2g32mqjrk5gdgx6xm2yp",
  "kg25qbrhjstb6g1bazsnwhc9196xn2kx",
  "kg29zpp3c9pfa8ge91cdkekmy96xn3vs",
  "kg254nzwn9hj6v676881c7jfr56xmna8",
  "kg26bg9btygxtfvp9hmqdv5xan6xmjyd",
  "kg29g4d4dbkxnry8hb2bs2051h6xn3cn",
  "kg2b3f10sby33vafh9rverd09h6xn1nm",
  "kg2ay04dqt4xdnyxq9c4y6ktq56xn0kc",
  "kg2ex8gy8dcasgxaa6ze15p5nd6xm7hj",
  "kg2fje5evxwf6zvjqphq9ywqwh6xmavc",
  "kg20bv1mgnj9hrwgbkgjekwf356xmewp",
  "kg273t52124cjgzq1pp2q0yspx6xmk12",
  "kg2abejtv600epdeyp047cpsc56xn2vq",
  "kg25ry930hxpdbey3nba5cafbx6xn8sq",
  "kg202tcc8fc2k8j4rp5cekqnrh6xm16f",
  "kg20g5q5eqzz33cdbe68kwx7en6xnj2k",
  "kg25qdmg89hqfeszkdagsm1emd6xm6xe",
  "kg2csqf491z0sx3d0y8qws8m7x6xmnbn",
  "kg25d613dw3d98rwsk50hr59ws6xnv8f",
  "kg28z46n4xsygjq07z88gbm7bh6xm3xz",
  "kg25hqtwmj7ckbdr1k0860seds6xna75",
  "kg2dpq2tsndajer5t6fcmfk4556xmv76",
  "kg2cq0anpry1yg4rz5exhrberx6xn5d5",
  "kg2dvnp59d7qvm01j7606dnpp96xm985",
  "kg22cd4hc9bk49a9p1v12bn8hh6xn94b",
  "kg2cdg8kj179gt6j515xfsa1756xnept",
  "kg2991bj4feyjswtzeyk87f1fn6xn8tm",
  "kg283jhhtmms661zd5s149k78s6xntvq",
  "kg26dmwn2zcsve7mkgf6970e696xnj2h",
  "kg2dhh7xwvad8s32w6qe4f8dq16xm9ss",
  "kg20t9tpe8adhrn42bc2z3kyqs6xm651",
  "kg206jbwdnkrpetcadmd3e3ss96xnz3f",
  "kg27g76bt9x380d1s7rqxcak416xn91k",
  "kg2062mnhv9hdyjkxke5e61r3n6xnebm",
  "kg23pf4yb28vz4qje1gb8h04dd6xmfsm",
  "kg22hpvrdvmd7smf5sj84mdc856xmcjz",
  "kg23zx3cgckccwfr7aqrtccck96xm2y1",
  "kg289a00hscyr9s49357kd26qs6xmn4a",
  "kg2a4tvd1762r7qex0gawj2p716xnpgt",
  "kg2dgq9nqewhs13t5m733grph16xn309",
  "kg25kn38mp6a0f74gga3qe69tn6xmxpj",
  "kg24kn1f161pygyvmaq1gpfhmx6xn1e5",
  "kg22addjz6486psnc7pf1n77616xn3tm",
  "kg2eff06q0mxbhpwd3erg8ge9s6xm4x2",
  "kg21smqt494pedpp728g0yzjsx6xn4qj",
  "kg2az6s06x3adwzc5f69x5bw6h6xm3c9",
  "kg2fnwxpa7c41qyfrb81x3ch2s6xms9p",
  "kg203jws3d8715g98cs9e99ne56xmzfz",
  "kg2ayw6xqtznpv02sa4zj7r26n6xnast",
  "kg230265w46vr1zrt4k8q889c96xnytc",
  "kg29gpqzc27vph8rmdfr8anh8n6xmsdx",
  "kg2eqphbe54f1g1wy65j8jz4v56xm128",
  "kg2b9grfn9a19s6gshc79ezjzs6xmnny",
  "kg21c9e8dsnhk97w03jsz9zt9h6xnk98",
  "kg220mkgj9jzwbmm2e9hpw61v96xmb5f",
  "kg21aywfvbjdejy5nteshcfjg56xn4qc",
  "kg293kvt4am9vqqx0tvq76k0ws6xnwwe",
  "kg288dspxmk7hrh373609380nx6xn32z",
  "kg2338vjpbm2pjkva283v9a6t16xmvs2",
  "kg2c619cv8dectvq7qtsxfyft96xn9yr",
  "kg2bwkqzfjfdw5p84a8b299d9h6xnadd",
  "kg22sgh5zyqt8evvr40wvrhq1x6xn6fr",
  "kg2cnm066s0x88znq814x5df0s6xm7gy",
  "kg2a1xn8gf0cwf0h2h9jjkw6nx6xmxt7",
  "kg2agnzkz7kwwz97sxsvskp08d6xnpqv",
  "kg23hp89hxet06y6rgdby7x8fh6xmbq7",
  "kg22bv25rhxws4z6s3wvdvja9s6xn7qn",
  "kg218k1ayd5ccny2k2gkbe2smx6xn4wf",
  "kg2643av7tr6b7d2v04e1xj23h6xmdw0",
  "kg22qmzjzjyamvxkmx8n9wm68n6xmh4c",
  "kg2cc6008pw4bt96qxcmpyy61d6xn9e9",
  "kg296980k910m5319xkefym1zh6xnv8t",
  "kg2fdxqk38wfhsckcbyz085vx56xmytx",
  "kg299pm50709mmdv7n2ek1jt516xn4rw",
  "kg2a0jeqva3e5878ygtjky6zhd6xm19f",
  "kg24r3k63qjrzzvhg2ymbjbkps6xnz63",
  "kg2bzg0cag49ykcahfqysx2dhh6xmnz2",
  "kg28xex6xn0zp8wweh4jrre34n6xnm2r",
  "kg24dmf6sw1v2qef5r6qmxn6r16xm16v",
  "kg29w2wepz5a15mtst51bbb1k56xmrt6",
  "kg244fcss32xbhzb711bxgsye56xn7bh",
  "kg2dt7svaw2648z65jhpxbgbg16xmejb",
  "kg2ett0n60m0j06zd32bzjvtch6xm1b9",
  "kg27shvtbjj7q3s49yacqf7gtx6xnrvv",
  "kg202ydgjqe7wy766t9dzd957h6xnyt1",
  "kg2f0yaawv8kxkv9yqtam8prrd6xnxv1",
  "kg28tg2ztj5hcrk9a18m99hz456xm7gx",
  "kg28fr38ec5hr6y4qmf021qe1s6xnv9h",
  "kg20pdp6fgvhn6t9s8wywjsz6h6xmbkx",
  "kg23czwq5yqgr3vzjkpx62ymhh6xmjh3",
  "kg2af9bx288p0kqrqdadhhf4g56xmtjv",
  "kg2fcfghvxzrbprqaxj51f36bs6xmv5d",
  "kg29xac330yecdnnb24tv8dbn16xme2t",
  "kg28ajtxdm3vjdw8zhvm6q2xm96xnw8j",
  "kg24g7v5hbjg7y4ktnkctccdvh6xmchy",
  "kg260r178zj1yeyqsw499fqrsh6xnxrh",
  "kg2cagxd8y0vpr09zq2gq9d03h6xn5ny",
  "kg23fh99sg5e85zbjjkekn26vh6xng92",
  "kg25rjv2b33p45snb2q9kh6qeh6xmjwt",
  "kg214pgp0rg8cm3ks4s4snm3k16xnw3n",
  "kg215vysyn0n80vn351cdk0zz56xna50",
  "kg27x219kagk3379swy252gfsd6xmt0z",
  "kg29q244zse496sbfz3cyvj1qh6xmmex",
  "kg2e40dmxfhdccecxh5dzr4a516xn996",
  "kg26zq92mvc8zn3jypt86mdczx6xnc2m",
  "kg26e58w80yh1npqdxc9bkxnss6xmht1",
  "kg28ta25yvqk684m70v23tesp96xn47w",
  "kg253k63h8ptxsvvka0xbwn7k16xn3y2",
  "kg24gdz8418cxjwvb1ya9c36k16xny40",
  "kg2erp4d6xk9fffh11na3pgrs16xmhrz",
  "kg2f63tyzq6xjcf1s9myxyej956xm4a3",
  "kg25nnbdjs451k5xq7tkca7xzd6xm7hr",
  "kg2c3139jeq8p1ja1d02jxfdpn6xm76j",
  "kg2fgtrn4rw3kcsj1fa9ema19h6xm3w7",
  "kg20fk3fw1189zq4ftzy4grjnh6xncaa",
  "kg2bxdy2m5k3jbn2smy10nj1yx6xndee",
  "kg2dwm26gq7s4tkezs1g48gqv56xmkhk",
  "kg21mzqfj8xk04jr5rc1mneqrs6xm1ys",
  "kg26httrnjdvzcy532bfk56n0x6xm1z2",
  "kg2b0ww4af9k5wg04gzey6j4zn6xms2f",
  "kg27nj8bg9zmeanp924bxjq9856xnfrv",
  "kg2drkjvgsfw57bekk1gswcd316xnzt2",
  "kg27v2t0bpw73ae3wx7fbv49gs6xm9hr",
  "kg2f9dwttfaes61fg6f8gw1gax6xm17p",
  "kg29h3xnambgw12yyhqa3gd4916xmbw1",
  "kg2fhg1asw7ew85ddef2tgdy9d6xngac",
  "kg2242vhmhv9afp9a12v1fp9ns6xn5ea",
  "kg2737babyr62f3tdvrfbjby1d6xm2k3",
  "kg2cj0q4p56tv1adpf4h2tnebh6xnx10",
  "kg2861bkb68rwx3fx6336159f56xnscp",
  "kg294t6mfz24vbk2vhwws0hern6xnjsr",
  "kg2a5t31fazwn0epzedqq6kh696xmpkd",
  "kg2677zwtvepw8v6qqsfm3zcw96xnxf4",
  "kg2d3988w06c0bwh3ty9t6gg0s6xmp4g",
  "kg216p9zw10gy42dbew7n050z16xn94k",
  "kg2743b0vsh9cty2wv1aayxqm56xnjd5",
  "kg264qqw9xy1reznyw99nzg4416xmqt4",
  "kg24p8yf76maawm21yewky9rkx6xngxm",
  "kg2b3x7fedeakzrs5dmpj61shh6xnh8c",
  "kg21yq7ka50n9ttwz5mn0emvd96xmmyg",
  "kg222d83n1eynnekj3hzcpxmnn6xnq6b",
  "kg20mxfrfpj4qqafax644aje996xmzd6",
  "kg2c5wfcd102aacphjxthj1m5s6xm2t5",
  "kg27gvcyqrpenyssd2685a1r796xnrp0",
  "kg2f7kgcten5xxad366dyv250n6xntxf",
  "kg2fvtvn8etpeg062pe7bwrjv16xnk7a",
  "kg255gf8x3j3a1tmqx3bsfg08n6xnrmq",
  "kg27kbgjd5mfva0rhgfmxqngfx6xn54a",
  "kg2bw7h679z2bekybpz1keghkn6xmyqp",
  "kg23gjdfqspygwrhns4bd8s1216xm3k9",
  "kg2ezwm7jfdzkkqxvdzrz3ae056xm9hp",
  "kg2cdbvgzdfh6p0h7z58p06yb56xmke1",
  "kg27ac4gcn7tdmwt1nhhgv9xv16xnkcs",
  "kg2db4aaqtj78s6zrbsw0dndkx6xn1vg",
  "kg2dh073415rg7f8kpqzykc91s6xmaet",
  "kg28m4grwbbpy04pjdxn5k379h6xm654",
  "kg2779vz062vbd02jh8s269q9x6xmsj8",
  "kg2ewc8dafjfp3eakwxdvdmqzh6xnyrb",
  "kg204r15qkfww20085jq24zr1x6xnw3x",
  "kg22q7xxy5cgqjh7ey9twsybbs6xnq26",
  "kg2929kkk2nzpyd7v61kfsknk96xnns9",
  "kg26tbx9tz2h2x4a8dxg7bmgpd6xmt89",
  "kg20mpy1e4hs0bsd0s6xm7gbn16xmttg",
  "kg26g68v8y9qnmssa03h000t056xmhcs",
  "kg26tqq7cg5zhxrq31p22gcpzx6xmtbd",
  "kg23t7wxv1g8ynk9pbn5ktvwc96xm12a",
  "kg29jhjmrpawb8v7d3m0xthqmd6xmhd6",
  "kg2eq9py8x4ahzjzvgkyaqzjh16xn2sy",
  "kg22jajs1tdchcq77gxjpge7mh6xnjqs",
  "kg21z729xw3d1bdejz7khe7n4s6xmq4c",
  "kg259q5qhk95y1b43jvr0nt0rd6xn0bj",
  "kg20mv0w2234q6qvv6tf2dv2m56xn1sc",
  "kg25s0gs750h382kwxfd8kwn7d6xmx4n",
  "kg25mkd7bxskhyb6xxdcgaf7vx6xmzm8",
  "kg26vfke6jtxxamv969h8bt1q16xn123",
  "kg2ekd7jvpynz30xg8x3weabz16xmvqt",
  "kg20vwe2yhp4cd0q6hc23ya4tx6xmee8",
  "kg2fbv49rasvv2tkbt1x2s4z9h6xmgp7",
  "kg2a01kp64tmmv8afjfvaj640x6xnva5",
  "kg2019neyaqfphbdjra98n8vgs6xn70b",
  "kg2d1s6rasqx2fsj29v2h9amzs6xm0ey",
  "kg2eg3hrbdeqpzzy1wa5kmw0xs6xmrhx",
  "kg2bkj83vx6c6vd47gzq65jann6xmhk3",
  "kg287xwr8asgq32mtb3vw06kjs6xmyef",
  "kg282dv5e7g35ft2dfw9xbfp616xmf27",
  "kg23xnqbkdg6pjy2hmaqz9rcm56xnbqq",
  "kg2fv6dgqscfmx6dpz5zfre3016xmyyr",
  "kg28b9aq7xknhz41j5bryknx856xn1gx",
  "kg2bvzv3jkwfrfbj266kj0bk5h6xn525",
  "kg232jn7tm05bh5zk8xr9eh2s16xn4rp",
  "kg2frb712zdymkwnt0t00ja8qs6xnryn",
  "kg29m5ps0r9g0zpfnj62292vt16xmqk7",
  "kg28gxc2dpbs570y2a4mj4srgh6xmj80",
  "kg27hs3pztvn4tr13kqn30hak56xnbc3",
  "kg2b0byaaqj7fay6nbfxzf4ga16xn5dy",
  "kg24e3agfrj2zjwz7eb24bx2vh6xmhn8",
  "kg24nvxmarmtw9wgef3583w0dd6xm7r9",
  "kg24ppsabtj2mswerg2er5r2f96xnzzp",
  "kg2fbkb15q68swm6qv2kc59t716xm9z8",
  "kg2fk5dsvhbeef80vt591nt0cn6xnp0m",
  "kg22tcbehztzsf3tm2ja5pzz7x6xmj70",
  "kg2eeqh1bv9ejtje6jja5ppne96xn6e7",
  "kg26dy5gt68ydpbe9y9qe37bs56xmzb5",
  "kg25a5d93d7favrz4x17v4zzz56xmdse",
  "kg20ve42hg66xx0scem2frrsv56xma1b",
  "kg25byw26zf1y9x0y9wsgfzzq96xn3tk",
  "kg24k01dzhcbbpw40kkyh2sgxs6xn89x",
  "kg20242x0b0wg54jnkrvkspq9d6xnh3p",
  "kg2d4w2mz89zc22c3txahpcyv56xn12j",
  "kg2fdawnrk3g6nej17tbrxdyxn6xn2xw",
  "kg26j9w21dyc263701tb323m6n6xnxj7",
  "kg29sp64m07qwhryb3fgjhmzg16xmdjb",
  "kg24nq0z2w46mypkxxpt22cxw16xmsd8",
  "kg22cee548pdfpg9dksdjh97bs6xnx1c",
  "kg26vaftshaafctyqbvyrdbvb16xmn7e",
  "kg2e3prfd53mr1a961cwvvzcxd6xny7g",
  "kg2c6embkqjx3k185d2ygxz4fh6xnhfj",
  "kg2f7a9j2j1f35hg6x6kdxsf0s6xnj1y",
  "kg2135gz6hqtgpaty3dfezr5xn6xnfc6",
  "kg2apcgmj9abgn651ttg9xeja56xmkjw",
  "kg2327rqc7kfvxt05s1e7kmp796xn6q9",
  "kg2947xdc2424fxrw2h7xmjtv96xmb1d",
  "kg220fx1eh5vn0xjwvn856n5q96xng2v",
  "kg239zjtc5trg8jg7fmdbt0hyx6xm2r2",
];

export const generateFileUrls = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    for (const storageId of storageIds) {
      // Generate the file URL
      const fileUrl = await ctx.storage.getUrl(storageId);

      // Store the file URL in the books_preprocessing table
      const documentId = await ctx.db.insert("books_preprocessing_test", {
        storageId,
        fileUrl,
      });

      results.push({ storageId, fileUrl, documentId });
    }

    return results;
  },
});

interface ClaudeAPIResponse {
  content: Array<{ text: string }>;
}

export const processBooks = action({
  args: {},
  handler: async (ctx): Promise<{ success: boolean; message: string }> => {
    const documents = await ctx.runQuery(api.books_preprocessing_test.getAll);

    for (const doc of documents) {
      try {
        const response = await callClaudeImageAPI(doc.fileUrl);
        console.log(response);
        const processedData = processClaudeResponse(response);
        console.log(processedData);
        await ctx.runMutation(api.books.create, processedData);
      } catch (error) {
        console.error(`Error processing document: ${doc.fileUrl}`, error);
      }
    }

    return { success: true, message: "All books processed" };
  },
});

async function callClaudeImageAPI(fileUrl: string): Promise<string> {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new ConvexError("Claude API key is not set");
  }

  const apiUrl = "https://api.anthropic.com/v1/messages";
  const model = "claude-3-opus-20240229";

  // Fetch the image data
  const imageResponse = await fetch(fileUrl);
  if (!imageResponse.ok) {
    throw new ConvexError(`Failed to fetch image: ${imageResponse.statusText}`);
  }
  const arrayBuffer = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  const prompt = `Analyze the following image of a book page. Extract the following information:
  
  1. Page content: Extract all text visible on the page.
  2. Page number: Identify the page number, if visible.
  3. Chapter information: Determine if this is the start of a new chapter or section.
  4. Footnotes: Identify any footnotes and their corresponding numbers.
  5. Publishing details: Extract any visible publishing information such as author, ISBN, publication date, etc.
  
  Please format your response as a JSON object with the following structure:
  
  {
    "pageContent": "string",
    "pageNumber": number,
    "chapter": {
      "number": number,
      "sectionTitle": "string",
      "title": "string"
    },
    "isChapterStart": boolean,
    "isSectionStart": boolean,
    "footnotes": [
      {
        "number": number,
        "content": "string"
      }
    ],
    "publishing": {
      "author": "string",
      "ISBN": "string",
      "printedPageCount": number,
      "publicationDate": number,
      "publisher": "string",
      "editors": [
        {
          "name": "string"
        }
      ],
      "translators": [
        {
          "name": "string"
        }
      ],
      "originalLanguage": "string"
    },
    "language": "string",
    "bookTitle": "The Foundations of the Karkariya Order",
    "bookTitleShort": "The Foundations"
  }
  
  Provide as much information as you can extract from the image. If certain fields are not visible or applicable, you may omit them from the JSON response.`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: base64Image,
                },
              },
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new ConvexError(
        `API call failed with status ${response.status}: ${errorBody}`
      );
    }

    const data: ClaudeAPIResponse = await response.json();

    if (!data.content || data.content.length === 0 || !data.content[0].text) {
      throw new ConvexError("Unexpected API response format");
    }

    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Claude Image API:", error);
    throw new ConvexError(
      "Failed to call Claude Image API: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

function processClaudeResponse(response: string): ProcessedBook {
  try {
    const parsedResponse = JSON.parse(response);

    // Ensure all required fields are present, use default values if not
    return {
      bookTitle:
        parsedResponse.bookTitle || "The Foundations of the Karkariya Order",
      bookTitleShort: parsedResponse.bookTitleShort || "The Foundations",
      chapter: {
        number: parsedResponse.chapter?.number || 0,
        sectionTitle: parsedResponse.chapter?.sectionTitle || "",
        title: parsedResponse.chapter?.title || "",
      },
      footnotes: Array.isArray(parsedResponse.footnotes)
        ? parsedResponse.footnotes.map((fn: any) => ({
            number: typeof fn.number === "number" ? fn.number : 0,
            content: typeof fn.content === "string" ? fn.content : "",
          }))
        : undefined,
      isChapterStart: !!parsedResponse.isChapterStart,
      isSectionStart: !!parsedResponse.isSectionStart,
      pageContent: parsedResponse.pageContent || "",
      pageNumber: parsedResponse.pageNumber || 0,
      language: parsedResponse.language || "en",
      publishing: parsedResponse.publishing || {},
    };
  } catch (error) {
    console.error("Error parsing Claude response:", error);
    throw new ConvexError("Failed to parse Claude response");
  }
}

// Helper function to convert Blob to base64
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
