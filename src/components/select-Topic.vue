<template>
  <div class="mainbox">
    <div class="title">{{ topic[topicnum].title }}</div>
    <div class="topics">
      <div class="topic-title">
        {{ topic[topicnum].topics_list[nowtopics].big_topic }}
      </div>
      <div class="topic-sel">
        <div
          class="selbox1"
          v-if="topic[topicnum].topics_list[nowtopics].type === 'hasimg'"
        >
          <div
            class="sel-item"
            v-for="(item, index) in topic[topicnum].topics_list[nowtopics]
              .datalist"
            :key="index"
          >
            <div class="left">
              {{ item.text }}
              <el-input
                v-model="input[index]"
                placeholder="选择选项"
                style="width: 100px"
              ></el-input>
            </div>
            <div class="right">
              <p>{{ item.alpha }}</p>
              <img :src="item.pic" alt="" class="selimg" v-if="item.pic" />
              <div v-else class="seltext">{{ item.seltext }}</div>
            </div>
          </div>
        </div>
        <div
          class="selbox2"
          v-else-if="topic[topicnum].topics_list[nowtopics].type === 'program'"
        >
          <div>[此题为编程题，请到右边编程界面完成代码书写]</div>
        </div>
        <div
          class="selbox3"
          v-else-if="
            topic[topicnum].topics_list[nowtopics].type === 'moreradio'
          "
        >
          <el-checkbox-group v-model="input" class="checkbox">
            <el-checkbox
              class="radioitem"
              :label="item.alpha"
              v-for="(item, index) in topic[topicnum].topics_list[nowtopics]
                .datalist"
              :key="index"
            >
              {{ item.alpha }}、{{ item.text }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="selbox3" v-else>
          <el-radio
            v-model="input[0]"
            :label="item.alpha"
            class="radioitem"
            v-for="(item, index) in topic[topicnum].topics_list[nowtopics]
              .datalist"
            :key="index"
          >
            {{ item.alpha }}、{{ item.text }}
          </el-radio>
        </div>
        <div class="confirmbox">
          <el-button
            type="primary"
            class="confirmbtn"
            @click="confirm"
            :disabled="cando"
          >
            提交
          </el-button>
        </div>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="topic[topicnum].alltopics"
          :page-size="1"
          :current-page="nowtopics + 1"
          @current-change="changepage"
        >
        </el-pagination>
      </div>
    </div>
    <div class="schedule"></div>
  </div>
</template>

<script>
import caomei from '../public/草莓.png'
import chengzi from '../public/橙子.png'
import lizi from '../public/梨子.png'
import pinguo from '../public/苹果.png'
import taozi from '../public/桃子.png'
import store from '@/store'

export default {
  data() {
    return {
      topicnum: 0,
      nowtopics: 0,
      input: [],
      cando: false,
      topic: [
        {
          title:
            '题目一：《心肺复苏》猝死是最可怕的疾病，因为猝死是具有突发性、紧急性、严重性。我国每年大概有 54.4 万人死于心脏性猝死，而心肺复苏是对心脏骤停的急救操作。请你结合以下具体情境进行选择，有问题可以随时向智慧学伴提问。',
          alltopics: 5,
          topics_list: [
            {
              type: 'radiobox',
              big_topic:
                '1.1某个晴天，你正在操场跑步，突然发现一个中年男人倒在地上，并且没有意识、没有呼吸和没有脉搏。在进行心肺复苏之前，你应该首先执行以下哪项操作？',
              datalist: [
                {
                  text: '把受伤者抬到安全的位置',
                  alpha: 'A',
                },
                {
                  text: '喊叫周围的人寻求帮助',
                  alpha: 'B',
                },
                {
                  text: '打开受伤者的衣领以便呼吸',
                  alpha: 'C',
                },
                {
                  text: '检查呼吸道是否有明显阻塞',
                  alpha: 'D',
                },
              ],
              score: 2,
              checkanswer: ['D'],
            },
            {
              type: 'radiobox',
              big_topic:
                '1.2你已经做完心肺复苏前的所有准备工作，需要立即开始心肺复苏，你需要将一个手放在受伤者胸骨下方的中间位置，另一只手放在第一个手的上方，交叉叠放；使用身体上半部分的重量，用快速而坚决的压力进行连续（）次的胸外按压，每次按压约（）厘米深；然后停止按压，给予（）次人工呼吸。将头后仰，捏紧鼻子同时轻柔地用口对口或口对鼻进行每次1秒钟的人工呼吸。',
              datalist: [
                {
                  text: '30 10 两',
                  alpha: 'A',
                },
                {
                  text: '30 5  一',
                  alpha: 'B',
                },
                {
                  text: '15 5  两',
                  alpha: 'C',
                },
                {
                  text: '30 5  两',
                  alpha: 'D',
                },
              ],
              score: 2,
              checkanswer: ['D'],
            },
            {
              type: 'radiobox',
              big_topic:
                '1.3你正在进行心肺复苏，已经连续进行了30分钟，但受伤者仍然没有恢复意识。在这种情况下，你应该如何调整急救措施？',
              datalist: [
                {
                  text: '继续按照操作指南继续进行心肺复苏',
                  alpha: 'A',
                },
                {
                  text: '停止胸外按压，只进行人工呼吸',
                  alpha: 'B',
                },
                {
                  text: '终止心肺复苏，并等待急救人员的到来',
                  alpha: 'C',
                },
                {
                  text: '将受伤者转移到更舒适的位置进行急救',
                  alpha: 'D',
                },
              ],
              score: 2,
              checkanswer: ['C'],
            },
            {
              type: 'radiobox',
              big_topic:
                '1.4在进行心肺复苏时，以下哪项工程设计或技术创新有助于提高急救人员执行胸外按压和人工呼吸的效率和效果？',
              datalist: [
                {
                  text: '基于机器学习的实时反馈系统，可提供准确的按压深度和频率指导',
                  alpha: 'A',
                },
                {
                  text: '基于机器学习的实时反馈系统，可提供准确的按压深度和频率指导',
                  alpha: 'B',
                },
                {
                  text: '无线通信技术，使多个急救人员可以实时协同进行心肺复苏',
                  alpha: 'C',
                },
              ],
              score: 2,
              checkanswer: ['A'],
            },
            {
              type: 'program',
              big_topic:
                '1.5为了更好的体验上述心肺复苏的过程，需要制作一款感受心肺复苏过程的体验板，你可以运用你所知道的编程知识，模拟做心肺复苏时，胸外按压的过程，帮我们完善体验板的开发吗？',
              datalist: [],
              score: 10,
            },
          ],
        },
        {
          title:
            '题目二：《交通信号灯》交通信号灯的发明最早可以追溯到19世纪的英国地方警察官John Peake Knight，他于1868年在伦敦引入了世界上第一个交通信号灯。请你运用你所学的知识，结合以下具体情境进行作答，有问题可以随时向智慧学伴提问。',
          alltopics: 3,
          topics_list: [
            {
              type: 'radiobox',
              big_topic:
                '2.1小明骑自行车经过一个交叉路口，遇到了一个传统的三色红绿灯。红绿灯的工作原理如下：当红灯亮起时，表示禁止通行，所有车辆和行人都需要停下等待。当黄灯亮起时，表示准备换灯，此时已经通过红灯停下的车辆可以继续前行，但要注意行驶安全。当绿灯亮起时，表示允许通行，所有车辆和行人可以安全通过。当小明接近路口时，他看到红灯亮起，他应该怎么做？（ ）',
              datalist: [
                {
                  text: '加速通过红灯',
                  alpha: 'A',
                },
                {
                  text: '停下等待',
                  alpha: 'B',
                },
                {
                  text: '减速慢行',
                  alpha: 'C',
                },
              ],
              score: 2,
              checkanswer: ['B'],
            },
            {
              type: 'hasimg',
              big_topic:
                '2.2某同学需要制作一个简易的交通信号灯，你可以帮助他将以下交通信号灯中的组件与其功能进行配对吗？（将右边的功能拖拽到对应的组件旁边）',
              datalist: [
                {
                  text: '2.2.1信号灯灯泡',
                  alpha: 'A',
                  seltext: '检测车辆或行人',
                },
                {
                  text: '2.2.2电路控制器',
                  alpha: 'B',
                  seltext: '用于设置和调整信号灯系统的参数和模式',
                },
                {
                  text: '2.2.3传感器',
                  alpha: 'C',
                  seltext: '发光源',
                },
                {
                  text: '2.2.4控制面板',
                  alpha: 'D',
                  seltext: '控制灯光变化',
                },
                {
                  text: '2.2.5导线',
                  alpha: 'E',
                  seltext: '控制信号灯的时间间隔',
                },
                {
                  text: '2.2.6计时器',
                  alpha: 'F',
                  seltext: '连接电路控制器、灯泡和电源之间的电路路径',
                },
              ],
              score: 1,
              checkanswer: ['C', 'B', 'A', 'D', 'F', 'E'],
            },
            {
              type: 'program',
              big_topic: `2.3由于传统的交通信号灯采用的是定时控模式，在时间和空间方面的应变性不够智能，如何以车流量为核心实现智能交通信号灯的自动控制变得尤为重要，你可以运用你所学的python知识，完善一款智能交通信号灯的设计吗？
                        要求：
                        1、使用随机生成车辆数的方式模拟车流量数据；
                        2、假设某路口只有一组信号灯，根据车流量数据实现红绿灯自动切换；
                        3、程序运行过程中可以实时显示当前信号灯状态和车流量等信息。`,
              datalist: [],
              score: 12,
            },
          ],
        },
        {
          title:
            '题目三《食物热量卡》人体每时每刻都在消耗能量，这些能量是由食物中的产热营养素提供的。食物中能产生热量的营养素有蛋白质、脂肪、糖类和碳水化合物。它们经过氧化产生热量供身体维持生命、生长发育和运动。请你运用你所学的知识，结合以下具体情境进行作答，有问题可以随时向智慧学伴提问。',
          alltopics: 4,
          topics_list: [
            {
              type: 'radiobox',
              big_topic: '3.1 以下哪种食物提供的热量最高？',
              datalist: [
                {
                  text: '100克鸡胸肉',
                  alpha: 'A',
                },
                {
                  text: '100克牛奶',
                  alpha: 'B',
                },
                {
                  text: '100克苹果',
                  alpha: 'C',
                },
                {
                  text: '100克米饭',
                  alpha: 'D',
                },
              ],
              score: 2,
              checkanswer: ['D'],
            },
            {
              type: 'radiobox',
              big_topic: '3.2以下哪种食物的热量产生过程中需要消耗更多能量？',
              datalist: [
                {
                  text: '蛋白质',
                  alpha: 'A',
                },
                {
                  text: '脂肪',
                  alpha: 'B',
                },
                {
                  text: '糖类',
                  alpha: 'C',
                },
                {
                  text: '纤维素',
                  alpha: 'D',
                },
              ],
              score: 4,
              checkanswer: ['D'],
            },
            {
              type: 'moreradio',
              big_topic: `3.3饮料中含有大量的食品添加剂、色素、防腐剂等，这些物质进入人体会加重肾脏的负担，影响肾脏的排泄，可能导致肾结石，还会损伤牙齿。假设你是一名食品工程师，正在开发一种新型的饮料。以下是该饮料中主要成分的含量和营养信息，请根据提供的数据，作答下面的多项选择题。
蛋白质：3g
碳水化合物：10g
脂肪：1g
纤维素：2g
维生素C：15mg
钙：100mg
如果你想使这种饮料更适宜儿童食用，你会对哪个成分进行调整？`,
              datalist: [
                {
                  text: '蛋白质含量',
                  alpha: 'A',
                },
                {
                  text: '碳水化合物含量',
                  alpha: 'B',
                },
                {
                  text: '脂肪含量',
                  alpha: 'C',
                },
                {
                  text: '纤维素含量',
                  alpha: 'D',
                },
              ],
              score: 3,
              checkanswer: ['B', 'D'],
            },
            {
              type: 'program',
              big_topic: `3.4某同学的中午和晚上食物热量消耗如下，
午餐：沙丁鱼 89 黄瓜 16 哈密瓜 34 米饭 116
晚餐：虾 101 茄子23 芒果35
你能帮我用python语言制作一个食物热量卡吗?
（要求：
1、定义食物及其热量
2、输入午餐食物
3、输入晚餐食物
4、计算总热量消耗
5、打印结果）`,
              datalist: [],
              score: 18,
            },
          ],
        },
        {
          title: '题目四：新鲜水果感知笔',
          alltopics: 3,
          topics_list: [
            {
              type: 'hasimg',
              big_topic:
                ' 4.1水果有助于身体健康，能起到补充营养、提供膳食纤维、抗氧化、促进消化和代谢、强化免疫系统等作用。请你运用你所学的知识，结合以下具体情境进行作答，有问题可以随时向智慧学伴提问。下面是五种水果以及它们的一些特点。请将左边的特点与右边对应的水果进行连线。',
              datalist: [
                {
                  text: '4.1.1密度大，易腐烂',
                  alpha: 'A',
                  pic: caomei,
                },
                {
                  text: '4.1.2含有丰富的维生素C',
                  alpha: 'B',
                  pic: chengzi,
                },
                {
                  text: '4.1.3富含纤维素，有助于消化',
                  alpha: 'C',
                  pic: lizi,
                },
                {
                  text: '4.1.4新鲜程度高，保质期长',
                  alpha: 'D',
                  pic: pinguo,
                },
                {
                  text: '4.1.5含有丰富的抗氧化物',
                  alpha: 'E',
                  pic: taozi,
                },
              ],
              score: 2,
              checkanswer: ['E', 'B', 'C', 'D', 'A'],
            },
            {
              type: 'program',
              big_topic:
                '4.2日常生活中，在超市里选购水果时，有些水果可以通过简单的观察挑选即可判断其是否新鲜，但很多水果仅凭触摸和观察是较难判断其内部是否新鲜的。其实，不新鲜的水果的主要特征是内部水分的流失。因此，新鲜的水果含水量高、导电性强，不新鲜的水果含水量较低、导电性弱。某课程小组需要设计一种智能感知笔，通过导电性的强弱来判断水果是否新鲜。你可以运用你所学的python编程语言，帮助他们完成代码的设计吗？（为方便，我们采用0.5作为阈值）',
              datalist: [],
              score: 18,
            },
            {
              type: 'radiobox',
              big_topic:
                '4.3上述设计的智能感知笔可以通过导电性来判断水果的新鲜度。下列哪种材料最适合作为智能感知笔的导电材料？',
              datalist: [
                {
                  text: '铝箔纸',
                  alpha: 'A',
                },
                {
                  text: '塑料薄膜',
                  alpha: 'B',
                },
                {
                  text: '木头',
                  alpha: 'C',
                },
                {
                  text: '纸张测试',
                  alpha: 'D',
                },
              ],
              score: 4,
              checkanswer: ['A'],
            },
          ],
        },
      ],
      answer: [
        {
          alltext: '该题体现了计算思维的分解、算法、抽象等维度',
          statement: [
            {
              type: 'rightwrong',
              right:
                '“你真棒，答对了”。查呼吸道是否有明显阻塞。在进行心肺复苏之前，需要先检查呼吸道是否有明显阻塞，因为如果呼吸道被物体堵塞，胸外按压和人工呼吸都无法有效，必须先清除阻塞才能进行心肺复苏。',
              wrong:
                '很好，你积极做出了选择。但是需要注意，在进行心肺复苏之前，我们应该优先检查呼吸道是否有明显阻塞，以确保氧气能够顺利进入受伤者的肺部。下次请记住这个步骤，继续努力哦',
            },
            {
              type: 'rightwrong',
              right: '你真棒，答对了',
              wrong:
                '非常好，你已经完成了心肺复苏的准备工作。然而，你的选择有一个小错误。让我来解释一下，正确的做法是按照现代心肺复苏指南的建议，进行30次胸外按压，每次按压约5厘米深，然后停止按压，给予两次人工呼吸。所以，正确答案是 D',
            },
            {
              type: 'rightwrong',
              right: '你真棒，答对了',
              wrong:
                '很好，你做出了选择。然而，你的答案有一个小错误。让我来解释一下，根据现代心肺复苏指南，如果在连续进行30分钟的心肺复苏后受伤者仍然没有恢复意识，我们应该终止心肺复苏，并等待急救人员的到来。所以，正确答案是 C。',
            },
            {
              type: 'rightwrong',
              right: '你真棒，答对了',
              wrong:
                '很好，你积极做出了选择。但是需要注意选项 B 提到可穿戴式智能设备通过触觉反馈来引导急救人员进行正确的按压力度。虽然这种技术可以提供指导，但并不能直接提高急救人员执行胸外按压和人工呼吸的效率和效果。选项 C 引用了无线通信技术，使多个急救人员可以实时协同进行心肺复苏。虽然这样的技术可以提高团队协作和配合，但它并不会直接影响急救人员执行胸外按压和人工呼吸的效率和效果。',
            },
            {
              type: 'none',
            },
          ],
        },
        {
          alltext: '该题体现了计算思维的分解、抽象、算法、概括等维度',
          statement: [
            {
              type: 'rightwrong',
              right:
                '恭喜你选择正确！选项A.加速通过红灯是不安全的行为。它可能会导致交通事故并对自己和其他人造成伤害。选项B.停下等待是正确的选择。这表明小明遵守了红灯的规定，并且在道路上保持了安全。选项C.减速慢行并不是最佳选择，因为这可能会让小明错过绿灯，并导致他在路口上堵车。因此，选择B.停下等待是正确的选择。',
              wrong:
                '很好，你积极做出了选择。但是需要注意选项A.加速通过红灯是不安全的行为。它可能会导致交通事故并对自己和其他人造成伤害。项B.停下等待。这表明小明遵守了红灯的规定，并且在道路上保持了安全。选项C.减速慢行并不是最佳选择，因为这可能会让小明错过绿灯，并导致他在路口上堵车。现在明白了吗？继续努力哦。',
            },
            {
              type: 'standard',
              text: `2.2.1 信号灯灯泡 - C 发光源：这是正确的选择。因为信号灯灯泡的主要作用就是发光，用于指示交通情况。而选项C正好描述了这个功能。
2.2.2 电路控制器 - B 用于设置和调整信号灯系统的参数和模式：这是正确的选择。因为电路控制器是交通信号灯系统中的核心元件，它可以控制信号灯的运作模式和时间间隔。选项B描述了电路控制器的主要功能。
2.2.3 传感器 - A 检测车辆或行人
2.2.4 控制面板 - D 控制灯光变化：这是正确的选择。因为控制面板主要用于控制灯光的变化，包括红、绿、黄灯的切换和闪烁等。选项D描述了控制面板的主要功能。
2.2.5 导线 - F 连接电路控制器、灯泡和电源之间的电路路径：这是正确的选择。因为导线用于连接电路控制器、灯泡和电源之间的电路路径，确保交通信号灯能正常工作。选项F描述了导线的主要功能。
2.2.6 计时器 - E 控制信号灯的时间间隔：这是正确的选择。因为计时器用于控制信号灯的时间间隔，确保交通信号灯按照预定的时间间隔进行切换。选项E描述了计时器的主要功能。`,
            },
            {
              type: 'none',
            },
          ],
        },
        {
          alltext: '该题体现了计算思维的分解、评估、抽象等维度',
          statement: [
            {
              type: 'rightwrong',
              right:
                '你真棒，答对了，题目要求找到提供的热量最高的食物。选项A. 100克鸡胸肉是蛋白质丰富的食物，它的热量相对较低。选项B. 100克牛奶是含有蛋白质和脂肪的食物，它的热量比鸡胸肉稍高。选项C. 100克苹果是水分和纤维丰富的食物，它的热量相对较低。选项D. 100克米饭是主要由碳水化合物组成的食物，它的热量通常比肉类和水果要高。因此，选择D. 100克米饭是正确的选择。恭喜你选择正确！',
              wrong: `很好，你积极做出了选择。但是需要注意题目要求找到提供的热量最高的食物。
选项A. 100克鸡胸肉是蛋白质丰富的食物，它的热量相对较低。
选项B. 100克牛奶是含有蛋白质和脂肪的食物，它的热量比鸡胸肉稍高。
选项C. 100克苹果是水分和纤维丰富的食物，它的热量相对较低。
选项D. 100克米饭是主要由碳水化合物组成的食物，它的热量通常比肉类和水果要高。现在明白了吗？继续努力哦`,
            },
            {
              type: 'rightwrong',
              right: `你真棒，答对了，题目要求找到热量产生过程中需要消耗更多能量的食物。
选项A. 蛋白质是身体所需的营养物质之一，它在消化和代谢过程中需要消耗更多的能量。
选项B. 脂肪是高能量的营养物质，但它的代谢过程相对较慢，需要消耗较少的能量。
选项C. 糖类是身体主要的能量来源之一，但它的代谢过程需要消耗的能量与蛋白质相近。
选项D. 纤维素是植物食物中的一种碳水化合物，它在消化过程中几乎不被分解和吸收，因此不需要消耗能量。
因此，选择A. 蛋白质是正确的选择。恭喜你选择正确！`,
              wrong: `很好，你积极做出了选择。但是需要注意题目要求找到热量产生过程中需要消耗更多能量的食物。
选项A. 蛋白质是身体所需的营养物质之一，它在消化和代谢过程中需要消耗更多的能量。
选项B. 脂肪是高能量的营养物质，但它的代谢过程相对较慢，需要消耗较少的能量。
选项C. 糖类是身体主要的能量来源之一，但它的代谢过程需要消耗的能量与蛋白质相近。
选项D. 纤维素是植物食物中的一种碳水化合物，它在消化过程中几乎不被分解和吸收，因此不需要消耗能量。
相信你一定涨了相关知识，继续努力哦！`,
            },
            {
              type: 'special',
              right: `首先，儿童需要摄入足够的碳水化合物来提供能量，促进身体的生长发育和智力发展。所以，调整碳水化合物含量是合理的。
另外，纤维素对于儿童的健康也非常重要，它有助于促进消化系统的正常运作，维持肠道健康。因此，增加纤维素含量也是一个很好的选择。
恭喜你，你的选择是正确的！通过调整碳水化合物含量和纤维素含量，这种饮料可以更适宜儿童食用。`,
              wrong:
                '很好，你积极做出了选择。但是需要注意，脂肪虽然也是儿童所需的营养成分之一，但是过多的脂肪摄入会导致肥胖和其他健康问题，因此不应该在这种饮料中过度添加脂肪。同样，虽然蛋白质也是儿童所需的营养成分之一，但过多的蛋白质摄入会对儿童的肾脏造成负担，因此在这种饮料中过度添加蛋白质也不是最佳选择。相信你一定涨了相关知识，继续努力哦！',
              chooseB: `我看到你选了选项B，但选项D也是正确的。纤维素是一种特殊类型的碳水化合物，它在人体消化系统中不被消化吸收。然而，纤维素在儿童的饮食中起着重要的作用。它有助于促进肠道健康、预防便秘，并帮助维持正常的消化功能。
适当的纤维素摄入可以保持儿童的肠道蠕动，促进食物在消化系统中的正常通过，避免便秘问题。此外，纤维素还可以帮助控制血糖水平，减缓食物的消化速度，使儿童在饭后更长时间保持饱腹感。
丰富的纤维素来源包括水果、蔬菜、全谷类和豆类等。在饮料配方中增加纤维素含量，可以为儿童提供额外的纤维素摄入途径，促进他们的健康。`,
              chooseD: `我看到你选了选项D，但选项B也是正确的。让我为你解释一下为什么碳水化合物对儿童的健康也很重要。
碳水化合物是身体的主要能量来源，特别是对于活跃的儿童来说非常重要。它们提供能量以支持儿童的生长发育、运动和认知功能。适当摄入碳水化合物有助于维持儿童的体力和注意力，使他们能够在学习和日常活动中保持活跃和专注。`,
            },
            {
              type: 'none',
            },
          ],
        },
        {
          alltext: '该题体现了计算思维的分解、抽象、算法等维度',
          statement: [
            {
              type: 'standard',
              text: '桃子的密度大，同时易腐烂，橙子含有丰富的维生素C，梨富含纤维素，对消化有助益，苹果的新鲜程度较高，同时保质期也较长，草莓含有丰富的抗氧化物，继续努力！',
            },
            {
              type: 'none',
            },
            {
              type: 'rightwrong',
              right:
                '“你真棒，答对了。”首先，让我们看一下题目的要求。题目中提到智能感知笔需要通过导电性来判断水果的新鲜度。现在我们来分析一下选项A.铝箔纸是否合适。铝箔纸是一种金属导电材料，具有良好的导电性能，可以用来传导电流。因此，它在理论上是可以作为智能感知笔的导电材料的。同时，铝箔纸相对柔软耐用，更适合在实际使用中接触水果表面。',
              wrong:
                '很好，你积极做出了选择。但是需要注意智能感知笔需要通过导电性来判断水果的新鲜度，而塑料薄膜、木头、纸张都是绝缘材料，不具有良好的导电性能，所以不能用来传导电流。铝箔纸是一种金属导电材料，具有良好的导电性能，可以用来传导电流。同时，铝箔纸相对柔软耐用，更适合在实际使用中接触水果表面。',
            },
          ],
        },
      ],
    }
  },
  props: ['a', 'b'],
  mounted() {
    this.topicnum = this.a
    this.nowtopics = this.b
    console.log(this.topicnum, this.nowtopics)
    this.cando = store.state.answer[this.topicnum][this.nowtopics] !== 0
  },
  watch: {},
  methods: {
    confirm() {
      console.log(this.input)
      // 判断对错
      // 临时处理编程题
      if (
        this.answer[this.topicnum].statement[this.nowtopics].type === 'none'
      ) {
        store.commit('setflag', {
          a: this.topicnum,
          b: this.nowtopics,
          f: true,
        })
        this.$alert(this.answer[this.topicnum].alltext, '题目结语', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (this.topicnum === 3) {
              return 0
            }
            this.topicnum += 1
            this.nowtopics = 0
          },
        })
        return 0
      }
      //
      const c =
        this.topic[this.topicnum].topics_list[this.nowtopics].checkanswer
      let scores = 0
      let flag = true
      let selb = false
      let seld = false
      for (let i = 0; i < c.length; i++) {
        if (c[i] === this.input[i]) {
          scores =
            scores + this.topic[this.topicnum].topics_list[this.nowtopics].score
        } else {
          flag = false
        }
        if (this.topicnum === 2 && this.nowtopics === 2) {
          if (this.input[i] === 'B') {
            selb = true
          }
          if (this.input[i] === 'D') {
            seld = true
          }
        }
      }
      if (this.topicnum === 2 && this.nowtopics === 2) {
        scores = 0
        if (selb)
          scores += this.topic[this.topicnum].topics_list[this.nowtopics].score
        if (seld)
          scores += this.topic[this.topicnum].topics_list[this.nowtopics].score
      }
      store.commit('setscore', scores)
      store.commit('setflag', { a: this.topicnum, b: this.nowtopics, f: flag })
      console.log(store.state.score)
      const ans = this.answer[this.topicnum].statement[this.nowtopics]
      const t = this.answer[this.topicnum].statement[this.nowtopics].type
      let seq = ''
      switch (t) {
        case 'standard':
          seq = seq + ans.text
          break
        case 'none':
          break
        case 'rightwrong':
          if (flag) {
            seq = ans.right
          } else {
            seq = ans.wrong
          }
          break
        case 'special':
          if (selb && seld) {
            seq = ans.right
          } else if (selb) {
            seq = ans.chooseB
          } else if (seld) {
            seq = ans.chooseD
          } else {
            seq = ans.wrong
          }
          break
        default:
          break
      }
      this.$alert(seq, '提示', {
        confirmButtonText: '确定',
        callback: (action) => {
          if (this.nowtopics !== this.topic[this.topicnum].alltopics - 1) {
            this.nowtopics += 1
          } else {
            this.$alert(this.answer[this.topicnum].alltext, '题目结语', {
              confirmButtonText: '确定',
              callback: (action) => {
                if (this.topicnum === 3) {
                  this.$alert('题目做完了，请点击答题卡去交卷', '提示', {
                    confirmButtonText: '确定',
                    callback: (action) => {
                      this.$message({
                        type: 'info',
                        message: `action: ${action}`,
                      })
                    },
                  })
                }
                this.topicnum += 1
                this.nowtopics = 0
              },
            })
          }
        },
      })
      this.input = []
    },
    changepage(e) {
      console.log(e)
      const p = Number.parseInt(e)
      this.nowtopics = p - 1
      this.cando = store.state.answer[this.topicnum][this.nowtopics] !== 0
    },
  },
}
</script>

<style lang="scss" scoped>
.mainbox {
  width: 95%;
  height: 50%;
  border-bottom: 1px solid lightblue;
  padding-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.title {
  font-size: 14px;
  font-weight: bold;
  font-family: fantasy;
  text-align: left;
}
.topics {
  width: 100%;
  margin-top: 3px;
  overflow: auto;
}
.topics::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.topics::-webkit-scrollbar-thumb {
  background-color: lightblue;
  border-radius: 3px;
}
.topic-title {
  font-size: 15px;
  color: gray;
  font-family: cursive;
  text-align: start;
}
.topic-sel {
  width: 100%;
}
.selbox1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sel-item {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.left {
  font-size: 15px;
  color: gray;
  font-family: cursive;
}
.right {
  min-width: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.selimg {
  width: 40px;
  height: 40px;
}
.confirmbox {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
  .confirmbtn {
    width: 80px;
    padding: 0 0;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
  }
}
.selbox2 {
  color: red;
  font-size: large;
  font-weight: bold;
  font-family: cursive;
  margin-top: 3px;
}
.selbox3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.radioitem {
  margin-left: 12px;
  margin-top: 8px;
}
.seltext {
  width: 200px;
  font-size: 15px;
  color: black;
  font-family: cursive;
}
.checkbox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
