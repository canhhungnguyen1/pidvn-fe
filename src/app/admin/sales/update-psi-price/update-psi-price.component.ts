import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdatePsiPriceService } from './services/update-psi-price.service';

@Component({
  selector: 'app-update-psi-price',
  templateUrl: './update-psi-price.component.html',
  styleUrls: ['./update-psi-price.component.scss'],
})
export class UpdatePsiPriceComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;

  constructor(
    private toastr: ToastrService, 
    private updatePsiPriceSvc: UpdatePsiPriceService
  ) {}

  highlightRow!: number;
  setOfCheckedId = new Set<number>();
  conversationName!: string;

  ngOnInit(): void {}

  subTitles = [
    {
      id: 1,
      enSub: 'Hi!',
      vnSub: 'Chào em',
      startTime: '00:00:00.990',
      endTime: '00:00:02.940',
    },
    {
      id: 2,
      enSub: 'Yes, you said that.',
      vnSub: 'Ừ anh đã chào rồi.',
      startTime: '00:00:02.940',
      endTime: '00:00:04.770',
    },
    {
      id: 3,
      enSub: "Yes! Yes, I did. But what I didn't say...",
      vnSub: 'Ừ, nhưng điều anh định nói là....',
      startTime: '00:00:04.770',
      endTime: '00:00:08.070',
    },
    {
      id: 4,
      enSub: 'What I wanted to say was, uh...',
      vnSub: 'Cái mà anh định nói là..',
      startTime: '00:00:08.070',
      endTime: '00:00:10.740',
    },
    {
      id: 5,
      enSub: '...would you like to go out with me? Thank you. Good night.',
      vnSub: '...em có thể đi chơi với anh không? Cảm ơn, tạm biệt.',
      startTime: '00:00:10.740',
      endTime: '00:00:14.080',
    },
    {
      id: 6,
      enSub: 'She said yes! She said yes!',
      vnSub: 'Cô ấy đồng ý rồi!',
      startTime: '00:00:14.080',
      endTime: '00:00:16.890',
    },
    {
      id: 7,
      enSub: 'MONICA: Wow!',
      vnSub: 'MONICA: Wow!',
      startTime: '00:00:16.890',
      endTime: '00:00:23.940',
    },
    {
      id: 8,
      enSub: `Her name's Aurora. She's Italian and she pronounces my name "Chandler."`,
      vnSub:
        'Cô ấy tên là Aurora. Cô ấy là người Ý và cô ấy phát âm tên tớ là " Chandler"',
      startTime: '00:00:23.940',
      endTime: '00:00:24.700',
    },
    {
      id: 9,
      enSub: 'I like that better. The usher gave me this to give to you.',
      vnSub:
        'Tớ thích nghe thế hơn. Người chỉ chỗ ngồi đưa cho tớ tờ giấy này.',
      startTime: '00:00:24.700',
      endTime: '00:00:26.492',
    },
    {
      id: 10,
      enSub: 'What is it? - The Estelle Leonard Talent Agency.',
      vnSub: 'Cái gì thế này? - Đó là Estelle Leonard người tìm kiếm tài năng.',
      startTime: '00:00:26.492',
      endTime: '00:00:28.950',
    },
  ];

  playPause() {
    var myVideo: any = document.getElementById('video-media');
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  restart() {
    let video: any = document.getElementById('video-media');
    video.currentTime = 0;
  }

  subtitleClick(data: any, index: number) {
    this.highlightRow = index;
    let video: any = document.getElementById('video-media');

    const [hoursStart, minutesStart, secondsStart] = data.startTime
      .split(':')
      .map(Number);
    const [hoursEnd, minutesEnd, secondsEnd] = data.endTime
      .split(':')
      .map(Number);

    let startTime = hoursStart * 3600 + minutesStart * 60 + secondsStart;
    let endTime = hoursEnd * 3600 + minutesEnd * 60 + secondsEnd;

    video.currentTime = startTime;

    setTimeout(() => {
      video.play();

      video.ontimeupdate = (event: any) => {
        if (video.currentTime >= endTime) {
          video.pause();
          video.removeAllListeners('timeupdate');
          return;
        }
      };
    }, 2000);
  }

  onItemChecked(id: number, checked: boolean) {
    console.log('nzCheckedChange: ', checked);
    this.updateCheckedSet(id, checked);
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCreate() {
    /**
     * Kiểm tra đã chọn đoạn hội thoại thì mới call API
     */
    if (this.setOfCheckedId.size == 0) {
      this.toastr.warning('Bạn cần chọn đoạn hội thoại', 'Warning');
      return;
    }

    let conversations = new Set(this.setOfCheckedId);

    let arr = Array.from(conversations).sort();

    let startTime = this.subTitles.filter((x) => x.id === arr[0])[0].startTime;
    let endTime = this.subTitles.filter((x) => x.id === arr.slice(-1)[0])[0]
      .endTime;

    let obj = {
      videoId: 1,
      conversationName: this.conversationName,
      startTime: startTime,
      endTime: endTime,
    };

    console.log('// Lưu đoạn hội thoại: ');
    console.log(obj);

    // TODO: Call API

    this.setOfCheckedId = new Set<number>();
    this.conversationName = '';
  }

  internal(time: any) {
    console.log(time);
  }

  /**
   * Ngân Test
   */

  productionData: any;
  date = new Date();
  isLoading: boolean = false
  isOpenLineDetailModal: boolean = false
  lineSelected: any;

  editRow(item: any) {
    console.log('Row: ', item);
    this.lineSelected = item


    this.isOpenLineDetailModal = true
  }

  
  getDailyReportData(date: Date) {
    this.isLoading = true;
    this.updatePsiPriceSvc.getDailyReportData(date).subscribe(
      response => {
        this.productionData = response
        this.isLoading = false;
      }
    )
  }

  onSearch() {
    this.getDailyReportData(this.date);
  }

  saveChange() {

  }
}
