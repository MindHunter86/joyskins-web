@extends('layout')

@section('content')
<div class="container">
    <div class="support-page article">

        <h1>Поддержка</h1>

        <p>Огромная просьба перед тем как задавать вопрос в нашу тех.поддержку прочитайте данный FAQ, где вы вероятнее всего найдете ответы на ваши вопросы</p>

        <div class="faq-section">

            <div class="faq-item">
                <div class="question">
                    <span>В:</span> Мне пришли не все предметы после победы!
                </div>
                <div class="answer">
                    <span>О:</span> С каждой игры мы берем комиссию {{ \App\Http\Controllers\GameController::COMMISSION }}%
                </div>
            </div> <!-- End of FAQ item -->

            <div class="faq-item">
                <div class="question">
                    <span>В:</span> Мне не пришел выйгрыш!
                </div>
                <div class="answer">
                    <span>О:</span> Отправка предметов может занимать до 30 минут (в зависимости от загруженности ботов), а также обратите внимание на то, что в настройках приватности вашего аккаунта Steam ваш инвентарь должен быть открыт: <a href="#">http://steamcommunity.com/id/me/edit/settings/</a>
                </div>
            </div> <!-- End of FAQ item -->

            <div class="faq-item">
                <div class="question">
                    <span>В:</span> Моя вещь не защиталась, что делать?
                </div>
                <div class="answer">
                    <span>О:</span> Все пришедшие вещи засчитываются. Если вещь не отображается, не стоит волноваться. Мы просто не смогли загрузить из Стима информацию и картинку. Но цена вещи из Стима всегда загружается и вещь участвует на равных правах в играх.
                </div>
            </div> <!-- End of FAQ item -->

        </div> <!-- End of FAQ Section -->

        <div class="feedback">

            <p>Если вы здесь не нашли ответа на ваш вопрос, тогда вы можете задать его нашему саппорту через эту форму отправки сообщений в VK.</p>

            <div class="feedback-button">
                <a href="/">Отправить сообщение поддержке</a>
            </div>

        </div> <!-- End of Feedback -->


    </div>
</div>
@endsection