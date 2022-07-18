//% weight=100 color=#08415d icon="\uf1ae"
namespace activityRecognition {

    //  copy & paste the below from the ML training code
    let scaler_mean = [-177.48559249786868, 927.1557118499572, -163.73593350383635, 313.40030982357086, 352.0293421898865, 359.9212856332229, -804.4117647058823, 282.70588235294116, -756.6419437340154, 435.17306052855923, 1532.8729752770673, 548.995737425405]
    let scaler_sd = [122.81336316110112, 155.35774130311398, 172.79928738733565, 325.4941488616266, 338.8675980850038, 436.1055304406833, 661.4673896097793, 760.6671341279181, 782.6163916969433, 722.2878198389716, 422.2618853350948, 743.0749119638036]
    let coef = [[0.09072921892541963, 0.02050763109394002, 0.07990760096870853, 0.1959510865053412, 0.24749407547432828, 0.08125397351231137, -0.15311007915439134, -0.18676970998309272, -0.10963787716854928, 0.26096017201491933, 0.6495797112134594, 0.14765281352724935], [0.9647705673104152, -0.9381255709889622, 1.0963808461538243, -0.5105358086653857, -2.8208343897965533, 2.733823393949729, -0.9638646413982466, -0.3980405455498639, -2.039661913627575, 4.249620325028033, 2.568703600692576, 2.0216968594194626], [-2.119320083729022, -4.14245613826354, 1.7671070112006362, -0.6863723259367873, -3.817945787910247, -0.42490535934352636, -0.8246324422987357, 0.7537638537456814, -0.44004469929569723, -0.16889468247695305, -5.910635423913789, -0.4925098534128196]]
    let k = [0.39686125762901153, -2.0798645104751996, -6.765924345356474]
    let activities = ["r", "s", "w"]

    //  raw accelerometer data collection by timestamp (100ms)
    let rawX: number[] = []
    let rawY: number[] = []
    let rawZ: number[] = []
    let current_activity = "start"

    //  define mathematical functions
    function average(list1: number[]): number {
        let sum = 0
        for (let value of list1) {
            sum += value
        }
        return sum / list1.length
    }

    function sd(list2: number[]): number {
        let x = 0
        for (let value of list2) {
            x += (value - average(list2)) ** 2
        }
        return Math.sqrt(x / list2.length)
    }

    function minimum(list3: number[]): number {
        let val = list3[0]
        for (let value of list3) {
            val = Math.min(val, value)
        }
        return val
    }

    function maximum(list4: number[]): number {
        let val2 = list4[0]
        for (let value of list4) {
            val2 = Math.max(val2, value)
        }
        return val2
    }

    // define features: feature_package order: avg x,y,z, sd x,y,z, min x,y,z, max x,y,z
    function feature_package(listx: number[], listy: number[], listz: number[]): any[] {
        let to_return = []
        to_return.push((average(listx) - scaler_mean[0]) / scaler_sd[0])
        to_return.push((average(listy) - scaler_mean[1]) / scaler_sd[1])
        to_return.push((average(listz) - scaler_mean[2]) / scaler_sd[2])
        to_return.push((sd(listx) - scaler_mean[3]) / scaler_sd[3])
        to_return.push((sd(listy) - scaler_mean[4]) / scaler_sd[4])
        to_return.push((sd(listz) - scaler_mean[5]) / scaler_sd[5])
        to_return.push((minimum(listx) - scaler_mean[6]) / scaler_sd[6])
        to_return.push((minimum(listy) - scaler_mean[7]) / scaler_sd[7])
        to_return.push((minimum(listz) - scaler_mean[8]) / scaler_sd[8])
        to_return.push((maximum(listx) - scaler_mean[9]) / scaler_sd[9])
        to_return.push((maximum(listy) - scaler_mean[10]) / scaler_sd[10])
        to_return.push((maximum(listz) - scaler_mean[11]) / scaler_sd[11])
        return to_return
    }

    //  define function that predicts class of a feature package (array of 12 elements computed from 20 data points 0.1 sec apart)
    function predict(list5: number[]): number {
        let i: number;
        let dot_product: number;
        let j: number;
        let votingPool: number[] = []
        for (i = 0; i < 3; i++) {
            dot_product = 0
            for (j = 0; j < 12; j++) {
                dot_product += coef[i][j] * list5[j]
            }
            if (dot_product + k[i] > 0) {
                votingPool.push(1)
            } else {
                votingPool.push(0)
            }

        }
        let currentIndex = 0
        let votes: number[] = []
        for (i = 0; i < activities.length - 1; i++) {
            for (j = i + 1; j < activities.length; j++) {
                if (votingPool[currentIndex] == 1) {
                    votes.push(i)
                } else {
                    votes.push(j)
                }

                currentIndex += 1
            }
        }
        let count = [0, 0, 0]
        for (i = 0; i < votes.length; i++) {
            count[votes[i]] += 1
        }
        return _py.py_array_index(count, maximum(count))
    }

    control.inBackground(() => {
        for (let index = 0; index < 19; index++) {
            rawX.push(input.acceleration(Dimension.X))
            rawY.push(input.acceleration(Dimension.Y))
            rawZ.push(input.acceleration(Dimension.Z))
            basic.pause(97)
        }
        while (true) {
            rawX.push(input.acceleration(Dimension.X))
            rawY.push(input.acceleration(Dimension.Y))
            rawZ.push(input.acceleration(Dimension.Z))
            basic.pause(97)
            current_activity = activities[predict(feature_package(rawX, rawY, rawZ))]
            rawX.removeAt(0)
            rawY.removeAt(0)
            rawZ.removeAt(0)
        }
    }
    )

    loops.everyInterval(1000, function () {
        datalogger.log(datalogger.createCV("activity type", current_activity))
    })

    datalogger.onLogFull(function () {
        datalogger.deleteLog(datalogger.DeleteType.Full)
    })

    //  every 0.1 sec: collect acceleration data, update
    //% block
    export function findActivity(): string {
        return current_activity
    }

    // block that shows string for 1 millisecond: if you use the default show string block it will display for ~1 second and cause a backlog of strings to display
    //% block
    export function show(s: string): void {
        basic.showString(s, 1);
    }
}