export function ram(data) {
    let a = data.content[1].data;
    let starts = [];
    let ends = [];

    for (let i = 0; i < a.length; i++) {
        if (a[i] === " " && a[i + 1] !== " ") {
            starts.push(i + 1);
        }
        if (a[i] == " " && a[i - 1] !== " ") {
            ends.push(i);
        }
    }

    ends.shift();
    ends.push(a.length);

    const result = {
        total: a.substring(starts[0], ends[0]),
        used: a.substring(starts[1], ends[1]),
        free: a.substring(starts[2], ends[2]),
    };

    return result;
}
