/**
 * Created by Dean on 2018/2/7.
 */
function deepCopy(data) {

    if (typeof data !== 'object')throw new TypeError(`typeof ${data} is not an 'object'`);

    let res;

    const method = {

        "Array"(src, stake) {

            src.map(item => {
                if (typeof item !== 'object' || item instanceof Function) {
                    stake.push(item);
                } else {
                    handle(item, stake);
                }
            });

        },
        "Object"(src, stake) {

            for (let pro in src) {
                const item = src[pro];
                if (typeof item !== 'object') {
                    stake[pro] = item;
                } else {
                    handle(item, stake, pro);
                }
            }
        },
        "Set"(src, stake){

            for (let v of src) {
                if (typeof v !== 'object') {
                    stake.add(v)
                } else {
                    handle(v, stake)
                }
            }

        },
        "Map"(src, stake){

            for (let [k, v] of src) {
                if (typeof v !== 'object') {
                    stake.set(k, v);
                } else {
                    handle(v, stake, k)
                }
            }

        },
        handleSave(save, stake, pro){

            if (save) {

                const proto = Object.prototype.toString.call(save);

                const dataType = proto.slice(8, -1);

                switch (dataType) {
                    case 'Array':
                        save.push(stake);
                        break;
                    case 'Object':
                        save[pro] = stake;
                        break;
                    case 'Map':
                        save.set([pro, stake]);
                        break;
                    case 'Set':
                        save.add(stake);
                        break;
                }
            } else {
                res = stake;
            }
        }
    };


    function handle(src, save, pro) {

        let stake;

        const proto = Object.prototype.toString.call(src);

        const dataType = proto.slice(8, -1);

        switch (dataType) {
            case 'Array':
                stake = [];
                break;
            case 'Object':
                stake = {};
                break;
            case 'Map':
                stake = new Map();
                break;
            case 'Set':
                stake = new Set();
                break;
        }

        method[dataType](src, stake);

        method.handleSave(save, stake, pro)

    }

    handle(data, res);

    return res;

}

export default deepCopy;