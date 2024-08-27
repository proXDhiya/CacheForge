import SharedEnv from '../storage/SharedEnv';

const args = process.argv.slice(2);

if (args.length % 2 !== 0) {
    console.error('Invalid number of arguments, could not parse key-value pairs');
    process.exit(1);
}

for (let i = 0; i < args.length; i += 2)
    SharedEnv.setEnv(args[i].substring(2), args[i + 1]);
