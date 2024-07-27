import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import { ConvexError } from "convex/values";
import fetch from "node-fetch";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books_preprocessing").collect();
  },
});

// List of storage IDs
const storageIds = [
  "kg2eq08m2bb7rfjz94y00e29v96xpae7",
  "kg243bfjzhfe9d46x5b89met456xqbvr",
  "kg24myjrd4cp26e6srm4zqnhr16xpemz",
  "kg20sm0gqvx7bkdt9bfjbq478n6xpqqg",
  "kg24h61767grz88n60bf0m3g8d6xpqt3",
  "kg2er98t2snh8nh6dp9dtk2vx56xpw7f",
  "kg2a2vh2y7f062pwp59dr4n3sx6xp51p",
  "kg2b67g9bfzga22gvzgf7z76gd6xpw72",
  "kg28x2kwcdrc7gd66tg4enx1xx6xpq9n",
  "kg2ckg5tndqmz091p1q0vvn4g16xpmxe",
  "kg2c2z5k1cpb5yntnmdnm8tx496xp69c",
  "kg26y1qmdc5j1j6tsh4m5j91as6xp03y",
  "kg2dvfs9e0yk3s6m6c6gr5yewx6xpewe",
  "kg2anmypdw7vxe8mtybkggk6316xq2h4",
  "kg290vd83dmffpf5rs826fbpgh6xp5be",
  "kg27wsf9k2tkx6aegnc2pt4m896xpk40",
  "kg2bcgd4xm0fdk0fx3bv292nk56xq8rc",
  "kg2ej97yms3vgj2ndcwysywr756xpw8s",
  "kg2byyh73ajr25hv65yp4xbhcs6xp5ff",
  "kg24jqewa3eyhb6y63t5q1pdn16xprxy",
  "kg2f7waew8dddgbgmhnkn1t3kn6xqbch",
  "kg28y8etyxfgpy0gvzw5nxgyqh6xpf4a",
  "kg25d5qyhxfs3s4kq6w47kp2616xp764",
  "kg2am0ze2gfcjc7ke916dh8hbh6xqkff",
  "kg2et7tds6rahbe1d8keh8paf16xp324",
  "kg25jm13r8dhcrqyvpthhbjn8x6xqpx7",
  "kg29kf5m8tcfbgn90zaztbt8296xpw8h",
  "kg23zzcpt0k0w3hwgp03tmsjtd6xq0hr",
  "kg27f47xvp2pjcerytf6kc00xs6xpewk",
  "kg2ad13fds5jt48e8h7275r6qd6xpwv0",
  "kg26dcccfce8vyb2tjwwf3459h6xq6zf",
  "kg2chp0e8kfqe76brd2662nb8s6xpq6k",
  "kg2e3c5gq6car2ey9zqwhmx5td6xpfmz",
  "kg2b0ggnf4ky6n7dj0dzpxm3qd6xqvdp",
  "kg2e4mdkj1vd04twtg9s7h4wch6xpc93",
  "kg2c5d9yk20bjg5p40thh88rvd6xphbt",
  "kg2ck4y224ntpb24tg4tesp8h16xpxtf",
  "kg23gn65xvp8ythttqrykmsk7d6xp5nd",
  "kg2fbjw47ga047z8q9djnwgkj16xpecd",
  "kg22wpmy642mrr33p2qq8hgeg96xqq6g",
  "kg24ve3kpeq3mwkaz46rnkpw916xpe9b",
  "kg25jsbbtt33f8p1pbcetkwn3n6xpqz2",
  "kg287zhrzr3f8p0gyx0fft584s6xqhas",
  "kg28gq2tr1k43rzzeazbwg09t96xpp5s",
  "kg234pnf0paj13rccm1kb42vnh6xq303",
  "kg24khgw1eh57rnb6hy2wm1ga56xpbtd",
  "kg2ctsacjfgekckb85xyrtfcjd6xpkx8",
  "kg2e8y26evf9fdkrt1ymh13pwx6xqye0",
  "kg2fbkhjg63ky70p1tpp0xpbmx6xpe8x",
  "kg25y5a8czg6s0zzhhx1vn5gn96xp2m6",
  "kg24wjsrkbjp3tv866qvaza9396xpg87",
  "kg2a9thgprsev0ft1m306svfk96xpq0h",
  "kg2bfe16hdhc6nk7jksaw3hb956xq00z",
  "kg27zkv98tgs2pcvcndgve1hn96xpjrf",
  "kg299hsmtsqmfy11a280pc60216xqssw",
  "kg22hpxkdxps9z1qx9vx61wr296xp1qe",
  "kg2frmftxtfz88qw5x7f3b1bvx6xqmqq",
  "kg2cnnv3rfx5sxyrb6ddta02cd6xp4aa",
  "kg27hw33gjtf8epw5g2bh713bd6xqny0",
  "kg295bqe0rqbnec7mtp9p9qbax6xpyb9",
  "kg2fqhc3fnm13ke2wkpphrf6tn6xpsb5",
  "kg23jjhdqfzqhftxwaghdmby1h6xqemf",
  "kg2cxvhk9fhmt7z0fe9n4x8y556xpk9a",
  "kg2932mkew32tt7gvfs7yxr7ns6xqw4c",
  "kg2c4z1b8gjgcpc9j6cn0ecpxx6xqeg5",
  "kg27hryhcmc65kdnv0em9t930x6xq88k",
  "kg236h0zbybrkbe360db9psgrd6xp6dm",
  "kg2d4dy92fwyy79nq1db31g9316xpman",
  "kg2989zx035r0837egnkzprvj96xqe53",
  "kg2daptbgyv9rq9z0me3d9tc9h6xpkq7",
  "kg2fgbtcgzacre6vg3dtfyeyax6xq9ed",
  "kg283z3sm8zvqxxybhbn5q17hx6xq9kg",
  "kg215gxjxkek5ev0nhm4sknn4h6xpv3c",
  "kg2bj5v47fdzqstm8sk0gy11bn6xqwhn",
  "kg230m2zq9wp53ah71z910kppx6xp3tv",
  "kg2c1jmvpbygnrzceyp1pzpwh96xq5rh",
  "kg21spqnebwyzzrg8q2jtrhre96xpqwq",
  "kg204jpbcq7xd2nd8z6nhwx3516xpjk7",
  "kg2cv4k1mj0nh6f3vp9fxsz2dn6xp956",
  "kg2677k3f8bprq956c5vqr07x16xpwz1",
  "kg2cneefnnsb8535cfkcqh6mah6xpsqg",
  "kg28182yt0rd28p82kb3s8a37x6xpjhc",
  "kg2eynm73mqyr8k9cmkw432xv16xqsq0",
  "kg24rn62vpactaqym06qyjp0yn6xqes9",
  "kg2763gbyen9w600a74zvy3jvs6xp1m5",
  "kg27rtxm1hf7b5ezm95bv8g2fx6xq0kn",
  "kg25h6c4c62js8hnx92wrdtsjh6xphec",
  "kg2eabgw046hmdyzgnvj5hfgxn6xqxcm",
  "kg290jxy0e34be6s6qwbt2kr3n6xpjfr",
  "kg273hygdfp65gfb785z3z5k1n6xp9ze",
  "kg200eqvxpe676bzjtnj3cwthx6xpfwk",
  "kg27rm28hz95tjaj2v928fppa16xq9db",
  "kg2aj4gbnaa8ag20stp8wngbm96xqq1a",
  "kg2bnpmg9v6059mszewm2x2ay16xqtgs",
  "kg27ryzdvh1j5fmfnnf9hwfw1s6xqp1e",
  "kg2178zmdgthqkj10b77xjc3w96xqec1",
  "kg2ew06eazrwn5vxkcbsdnqcp56xpsbk",
  "kg2bjp56v88k6k5bh08cd7dvz56xpgy3",
  "kg28r6ydf3v3k6m4ztbkgbgmxh6xqz2j",
  "kg27dvztky1206510dae2zba696xpwhv",
  "kg29yk5s6c48h169q7xwsa72js6xp71t",
  "kg257mgk0e87pwja5vg5qh45g56xqzcm",
  "kg24dcmf6nwmykw45ah3500a0h6xqavb",
  "kg2ackttkhv55dgk1k9bw6fev56xqg5h",
  "kg239st0xjdbgc8fbyjdjxx9hx6xpb5n",
  "kg27mx7x02wqpa703rx6p3jw4h6xpg42",
  "kg24729dbrcjtrcx93q8k4bejx6xqe6r",
  "kg252w1am3pj7137eq71hv96e16xpb44",
  "kg2bhyx1sggasj1cbeznq2jcbs6xpmbz",
  "kg21m3yeah27naxx1ghg2wqmd96xpe8y",
  "kg2ftjgqa74s7bgpa47r6eqgqn6xprd1",
];

export const generateFileUrls = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    for (const storageId of storageIds) {
      // Generate the file URL
      const fileUrl = await ctx.storage.getUrl(storageId);

      // Store the file URL in the books_preprocessing table
      const documentId = await ctx.db.insert("books_preprocessing", {
        storageId,
        fileUrl,
      });

      results.push({ storageId, fileUrl, documentId });
    }

    return results;
  },
});
